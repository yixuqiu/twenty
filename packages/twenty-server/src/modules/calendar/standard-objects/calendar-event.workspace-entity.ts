import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  RelationMetadataType,
  RelationOnDeleteAction,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { CalendarChannelEventAssociationWorkspaceEntity } from 'src/modules/calendar/standard-objects/calendar-channel-event-association.workspace-entity';
import { CalendarEventParticipantWorkspaceEntity } from 'src/modules/calendar/standard-objects/calendar-event-participant.workspace-entity';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { CALENDAR_EVENT_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { LinkMetadata } from 'src/engine/metadata-modules/field-metadata/composite-types/link.composite-type';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.calendarEvent,
  namePlural: 'calendarEvents',
  labelSingular: 'Calendar event',
  labelPlural: 'Calendar events',
  description: 'Calendar events',
  icon: 'IconCalendar',
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class CalendarEventWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.title,
    type: FieldMetadataType.TEXT,
    label: 'Title',
    description: 'Title',
    icon: 'IconH1',
  })
  title: string;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.isCanceled,
    type: FieldMetadataType.BOOLEAN,
    label: 'Is canceled',
    description: 'Is canceled',
    icon: 'IconCalendarCancel',
  })
  isCanceled: boolean;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.isFullDay,
    type: FieldMetadataType.BOOLEAN,
    label: 'Is Full Day',
    description: 'Is Full Day',
    icon: 'Icon24Hours',
  })
  isFullDay: boolean;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.startsAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Start Date',
    description: 'Start Date',
    icon: 'IconCalendarClock',
  })
  @WorkspaceIsNullable()
  startsAt: string | null;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.endsAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'End Date',
    description: 'End Date',
    icon: 'IconCalendarClock',
  })
  @WorkspaceIsNullable()
  endsAt: string | null;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.externalCreatedAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Creation DateTime',
    description: 'Creation DateTime',
    icon: 'IconCalendarPlus',
  })
  @WorkspaceIsNullable()
  externalCreatedAt: string | null;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.externalUpdatedAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Update DateTime',
    description: 'Update DateTime',
    icon: 'IconCalendarCog',
  })
  @WorkspaceIsNullable()
  externalUpdatedAt: string | null;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.description,
    type: FieldMetadataType.TEXT,
    label: 'Description',
    description: 'Description',
    icon: 'IconFileDescription',
  })
  description: string;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.location,
    type: FieldMetadataType.TEXT,
    label: 'Location',
    description: 'Location',
    icon: 'IconMapPin',
  })
  location: string;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.iCalUID,
    type: FieldMetadataType.TEXT,
    label: 'iCal UID',
    description: 'iCal UID',
    icon: 'IconKey',
  })
  iCalUID: string;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.conferenceSolution,
    type: FieldMetadataType.TEXT,
    label: 'Conference Solution',
    description: 'Conference Solution',
    icon: 'IconScreenShare',
  })
  conferenceSolution: string;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.conferenceLink,
    type: FieldMetadataType.LINK,
    label: 'Meet Link',
    description: 'Meet Link',
    icon: 'IconLink',
  })
  @WorkspaceIsNullable()
  conferenceLink: LinkMetadata;

  @WorkspaceField({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.recurringEventExternalId,
    type: FieldMetadataType.TEXT,
    label: 'Recurring Event ID',
    description: 'Recurring Event ID',
    icon: 'IconHistory',
  })
  recurringEventExternalId: string;

  @WorkspaceRelation({
    standardId:
      CALENDAR_EVENT_STANDARD_FIELD_IDS.calendarChannelEventAssociations,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Calendar Channel Event Associations',
    description: 'Calendar Channel Event Associations',
    icon: 'IconCalendar',
    inverseSideTarget: () => CalendarChannelEventAssociationWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  calendarChannelEventAssociations: Relation<
    CalendarChannelEventAssociationWorkspaceEntity[]
  >;

  @WorkspaceRelation({
    standardId: CALENDAR_EVENT_STANDARD_FIELD_IDS.calendarEventParticipants,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Event Participants',
    description: 'Event Participants',
    icon: 'IconUserCircle',
    inverseSideTarget: () => CalendarEventParticipantWorkspaceEntity,
    onDelete: RelationOnDeleteAction.CASCADE,
  })
  calendarEventParticipants: Relation<
    CalendarEventParticipantWorkspaceEntity[]
  >;
}
