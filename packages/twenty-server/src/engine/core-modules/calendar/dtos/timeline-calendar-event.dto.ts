import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';
import { TimelineCalendarEventParticipant } from 'src/engine/core-modules/calendar/dtos/timeline-calendar-event-participant.dto';
import { CalendarChannelVisibility } from 'src/modules/calendar/standard-objects/calendar-channel.workspace-entity';

registerEnumType(CalendarChannelVisibility, {
  name: 'CalendarChannelVisibility',
  description: 'Visibility of the calendar channel',
});

@ObjectType('LinkMetadata')
export class LinkMetadata {
  @Field()
  label: string;

  @Field()
  url: string;
}

@ObjectType('TimelineCalendarEvent')
export class TimelineCalendarEvent {
  @Field(() => UUIDScalarType)
  id: string;

  @Field()
  title: string;

  @Field()
  isCanceled: boolean;

  @Field()
  isFullDay: boolean;

  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  conferenceSolution: string;

  @Field(() => LinkMetadata)
  conferenceLink: LinkMetadata;

  @Field(() => [TimelineCalendarEventParticipant])
  participants: TimelineCalendarEventParticipant[];

  @Field(() => CalendarChannelVisibility)
  visibility: CalendarChannelVisibility;
}
