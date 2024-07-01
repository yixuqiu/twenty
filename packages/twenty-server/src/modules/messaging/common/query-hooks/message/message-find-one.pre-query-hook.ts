/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';

import { WorkspaceQueryHookInstance } from 'src/engine/api/graphql/workspace-query-runner/workspace-query-hook/interfaces/workspace-query-hook.interface';
import { FindOneResolverArgs } from 'src/engine/api/graphql/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';

import { WorkspaceQueryHook } from 'src/engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator';
import { InjectObjectMetadataRepository } from 'src/engine/object-metadata-repository/object-metadata-repository.decorator';
import { CanAccessMessageThreadService } from 'src/modules/messaging/common/query-hooks/message/can-access-message-thread.service';
import { MessageChannelMessageAssociationRepository } from 'src/modules/messaging/common/repositories/message-channel-message-association.repository';
import { MessageChannelMessageAssociationWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-channel-message-association.workspace-entity';

@WorkspaceQueryHook(`message.findOne`)
export class MessageFindOnePreQueryHook implements WorkspaceQueryHookInstance {
  constructor(
    @InjectObjectMetadataRepository(
      MessageChannelMessageAssociationWorkspaceEntity,
    )
    private readonly messageChannelMessageAssociationService: MessageChannelMessageAssociationRepository,
    private readonly canAccessMessageThreadService: CanAccessMessageThreadService,
  ) {}

  async execute(
    userId: string,
    workspaceId: string,
    payload: FindOneResolverArgs,
  ): Promise<void> {
    const messageChannelMessageAssociations =
      await this.messageChannelMessageAssociationService.getByMessageIds(
        [payload?.filter?.id?.eq],
        workspaceId,
      );

    if (messageChannelMessageAssociations.length === 0) {
      throw new NotFoundException();
    }

    await this.canAccessMessageThreadService.canAccessMessageThread(
      userId,
      workspaceId,
      messageChannelMessageAssociations,
    );
  }
}
