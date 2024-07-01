import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, In } from 'typeorm';

import { DataSourceEntity } from 'src/engine/metadata-modules/data-source/data-source.entity';
import { MessageQueue } from 'src/engine/integrations/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/integrations/message-queue/services/message-queue.service';
import { InjectObjectMetadataRepository } from 'src/engine/object-metadata-repository/object-metadata-repository.decorator';
import { MessageChannelRepository } from 'src/modules/messaging/common/repositories/message-channel.repository';
import {
  MessageChannelSyncStage,
  MessageChannelWorkspaceEntity,
} from 'src/modules/messaging/common/standard-objects/message-channel.workspace-entity';
import {
  MessagingMessageListFetchJobData,
  MessagingMessageListFetchJob,
} from 'src/modules/messaging/message-import-manager/jobs/messaging-message-list-fetch.job';
import { InjectMessageQueue } from 'src/engine/integrations/message-queue/decorators/message-queue.decorator';
import { Processor } from 'src/engine/integrations/message-queue/decorators/processor.decorator';
import { Process } from 'src/engine/integrations/message-queue/decorators/process.decorator';
import { BillingService } from 'src/engine/core-modules/billing/billing.service';

@Processor(MessageQueue.cronQueue)
export class MessagingMessageListFetchCronJob {
  private readonly logger = new Logger(MessagingMessageListFetchCronJob.name);

  constructor(
    @InjectRepository(DataSourceEntity, 'metadata')
    private readonly dataSourceRepository: Repository<DataSourceEntity>,
    @InjectMessageQueue(MessageQueue.messagingQueue)
    private readonly messageQueueService: MessageQueueService,
    @InjectObjectMetadataRepository(MessageChannelWorkspaceEntity)
    private readonly messageChannelRepository: MessageChannelRepository,
    private readonly billingService: BillingService,
  ) {}

  @Process(MessagingMessageListFetchCronJob.name)
  async handle(): Promise<void> {
    const workspaceIds =
      await this.billingService.getActiveSubscriptionWorkspaceIds();

    const dataSources = await this.dataSourceRepository.find({
      where: {
        workspaceId: In(workspaceIds),
      },
    });

    const workspaceIdsWithDataSources = new Set(
      dataSources.map((dataSource) => dataSource.workspaceId),
    );

    for (const workspaceId of workspaceIdsWithDataSources) {
      const messageChannels =
        await this.messageChannelRepository.getAll(workspaceId);

      for (const messageChannel of messageChannels) {
        if (
          (messageChannel.isSyncEnabled &&
            messageChannel.syncStage ===
              MessageChannelSyncStage.PARTIAL_MESSAGE_LIST_FETCH_PENDING) ||
          messageChannel.syncStage ===
            MessageChannelSyncStage.FULL_MESSAGE_LIST_FETCH_PENDING
        ) {
          await this.messageQueueService.add<MessagingMessageListFetchJobData>(
            MessagingMessageListFetchJob.name,
            {
              workspaceId,
              messageChannelId: messageChannel.id,
            },
          );
        }
      }
    }
  }
}
