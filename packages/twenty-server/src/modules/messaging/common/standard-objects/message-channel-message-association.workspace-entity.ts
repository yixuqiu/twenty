import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { MessageChannelWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-channel.workspace-entity';
import { MessageThreadWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-thread.workspace-entity';
import { MessageWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message.workspace-entity';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.messageChannelMessageAssociation,
  namePlural: 'messageChannelMessageAssociations',
  labelSingular: 'Message Channel Message Association',
  labelPlural: 'Message Channel Message Associations',
  description: 'Message Synced with a Message Channel',
  icon: 'IconMessage',
})
@WorkspaceIsNotAuditLogged()
@WorkspaceIsSystem()
export class MessageChannelMessageAssociationWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId:
      MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_STANDARD_FIELD_IDS.messageExternalId,
    type: FieldMetadataType.TEXT,
    label: 'Message External Id',
    description: 'Message id from the messaging provider',
    icon: 'IconHash',
  })
  @WorkspaceIsNullable()
  messageExternalId: string | null;

  @WorkspaceField({
    standardId:
      MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_STANDARD_FIELD_IDS.messageThreadExternalId,
    type: FieldMetadataType.TEXT,
    label: 'Thread External Id',
    description: 'Thread id from the messaging provider',
    icon: 'IconHash',
  })
  @WorkspaceIsNullable()
  messageThreadExternalId: string | null;

  @WorkspaceRelation({
    standardId:
      MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_STANDARD_FIELD_IDS.messageChannel,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Message Channel Id',
    description: 'Message Channel Id',
    icon: 'IconHash',
    inverseSideTarget: () => MessageChannelWorkspaceEntity,
    inverseSideFieldKey: 'messageChannelMessageAssociations',
  })
  @WorkspaceIsNullable()
  messageChannel: Relation<MessageChannelWorkspaceEntity> | null;

  @WorkspaceJoinColumn('messageChannel')
  messageChannelId: string;

  @WorkspaceRelation({
    standardId: MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_STANDARD_FIELD_IDS.message,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Message Id',
    description: 'Message Id',
    icon: 'IconHash',
    inverseSideTarget: () => MessageWorkspaceEntity,
    inverseSideFieldKey: 'messageChannelMessageAssociations',
  })
  @WorkspaceIsNullable()
  message: Relation<MessageWorkspaceEntity> | null;

  @WorkspaceJoinColumn('message')
  messageId: string;

  @WorkspaceRelation({
    standardId:
      MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_STANDARD_FIELD_IDS.messageThread,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'Message Thread Id',
    description: 'Message Thread Id',
    icon: 'IconHash',
    inverseSideTarget: () => MessageThreadWorkspaceEntity,
    inverseSideFieldKey: 'messageChannelMessageAssociations',
  })
  @WorkspaceIsNullable()
  messageThread: Relation<MessageThreadWorkspaceEntity> | null;

  @WorkspaceJoinColumn('messageThread')
  messageThreadId: string;
}
