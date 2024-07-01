import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ObjectRecordCreateEvent } from 'src/engine/integrations/event-emitter/types/object-record-create.event';
import { ObjectRecordUpdateEvent } from 'src/engine/integrations/event-emitter/types/object-record-update.event';
import { objectRecordChangedProperties as objectRecordUpdateEventChangedProperties } from 'src/engine/integrations/event-emitter/utils/object-record-changed-properties.util';
import { InjectMessageQueue } from 'src/engine/integrations/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/integrations/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/integrations/message-queue/services/message-queue.service';
import {
  MatchParticipantJobData,
  MatchParticipantJob,
} from 'src/modules/calendar-messaging-participant/jobs/match-participant.job';
import {
  UnmatchParticipantJobData,
  UnmatchParticipantJob,
} from 'src/modules/calendar-messaging-participant/jobs/unmatch-participant.job';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';

@Injectable()
export class ParticipantPersonListener {
  constructor(
    @InjectMessageQueue(MessageQueue.messagingQueue)
    private readonly messageQueueService: MessageQueueService,
  ) {}

  @OnEvent('person.created')
  async handleCreatedEvent(
    payload: ObjectRecordCreateEvent<PersonWorkspaceEntity>,
  ) {
    if (payload.properties.after.email === null) {
      return;
    }

    await this.messageQueueService.add<MatchParticipantJobData>(
      MatchParticipantJob.name,
      {
        workspaceId: payload.workspaceId,
        email: payload.properties.after.email,
        personId: payload.recordId,
      },
    );
  }

  @OnEvent('person.updated')
  async handleUpdatedEvent(
    payload: ObjectRecordUpdateEvent<PersonWorkspaceEntity>,
  ) {
    if (
      objectRecordUpdateEventChangedProperties(
        payload.properties.before,
        payload.properties.after,
      ).includes('email')
    ) {
      await this.messageQueueService.add<UnmatchParticipantJobData>(
        UnmatchParticipantJob.name,
        {
          workspaceId: payload.workspaceId,
          email: payload.properties.before.email,
          personId: payload.recordId,
        },
      );

      await this.messageQueueService.add<MatchParticipantJobData>(
        MatchParticipantJob.name,
        {
          workspaceId: payload.workspaceId,
          email: payload.properties.after.email,
          personId: payload.recordId,
        },
      );
    }
  }
}
