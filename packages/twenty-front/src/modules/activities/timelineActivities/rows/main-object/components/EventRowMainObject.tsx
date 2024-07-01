import styled from '@emotion/styled';

import {
  EventRowDynamicComponentProps,
  StyledEventRowItemAction,
  StyledEventRowItemColumn,
} from '@/activities/timelineActivities/rows/components/EventRowDynamicComponent';
import { EventRowMainObjectUpdated } from '@/activities/timelineActivities/rows/main-object/components/EventRowMainObjectUpdated';

type EventRowMainObjectProps = EventRowDynamicComponentProps;

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const EventRowMainObject = ({
  authorFullName,
  labelIdentifierValue,
  event,
  mainObjectMetadataItem,
}: EventRowMainObjectProps) => {
  const [, eventAction] = event.name.split('.');

  switch (eventAction) {
    case 'created': {
      return (
        <StyledMainContainer>
          <StyledEventRowItemColumn>
            {labelIdentifierValue}
          </StyledEventRowItemColumn>
          <StyledEventRowItemAction>was created by</StyledEventRowItemAction>
          <StyledEventRowItemColumn>{authorFullName}</StyledEventRowItemColumn>
        </StyledMainContainer>
      );
    }
    case 'updated': {
      return (
        <EventRowMainObjectUpdated
          authorFullName={authorFullName}
          labelIdentifierValue={labelIdentifierValue}
          event={event}
          mainObjectMetadataItem={mainObjectMetadataItem}
        />
      );
    }
    default:
      return null;
  }
};
