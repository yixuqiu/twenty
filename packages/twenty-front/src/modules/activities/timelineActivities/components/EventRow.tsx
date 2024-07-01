import { useContext } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { useLinkedObject } from '@/activities/timeline/hooks/useLinkedObject';
import { TimelineActivityContext } from '@/activities/timelineActivities/contexts/TimelineActivityContext';
import { EventIconDynamicComponent } from '@/activities/timelineActivities/rows/components/EventIconDynamicComponent';
import { EventRowDynamicComponent } from '@/activities/timelineActivities/rows/components/EventRowDynamicComponent';
import { TimelineActivity } from '@/activities/timelineActivities/types/TimelineActivity';
import { getTimelineActivityAuthorFullName } from '@/activities/timelineActivities/utils/getTimelineActivityAuthorFullName';
import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { beautifyPastDateRelativeToNow } from '~/utils/date-utils';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';

const StyledTimelineItemContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  height: 'auto';
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.font.color.tertiary};
  height: 16px;
  width: 16px;
  margin: 5px;
  user-select: none;
  text-decoration-line: underline;
  z-index: 2;
`;

const StyledVerticalLineContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  z-index: 2;
  height: 100%;
`;

const StyledVerticalLine = styled.div`
  background: ${({ theme }) => theme.border.color.light};
  width: 2px;
  height: 100%;
`;

const StyledSummary = styled.summary`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledItemContainer = styled.div<{ isMarginBottom?: boolean }>`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  overflow: hidden;
  margin-bottom: ${({ isMarginBottom, theme }) =>
    isMarginBottom ? theme.spacing(3) : 0};
  min-height: 26px;
`;

const StyledItemTitleDate = styled.div`
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.font.color.tertiary};
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: flex-end;
  margin-left: auto;
`;

type EventRowProps = {
  mainObjectMetadataItem: ObjectMetadataItem | null;
  isLastEvent?: boolean;
  event: TimelineActivity;
};

export const EventRow = ({
  isLastEvent,
  event,
  mainObjectMetadataItem,
}: EventRowProps) => {
  const currentWorkspaceMember = useRecoilValue(currentWorkspaceMemberState);

  const { labelIdentifierValue } = useContext(TimelineActivityContext);
  const beautifiedCreatedAt = beautifyPastDateRelativeToNow(event.createdAt);
  const linkedObjectMetadataItem = useLinkedObject(
    event.linkedObjectMetadataId,
  );

  if (isUndefinedOrNull(currentWorkspaceMember)) {
    return null;
  }

  const authorFullName = getTimelineActivityAuthorFullName(
    event,
    currentWorkspaceMember,
  );

  if (isUndefinedOrNull(mainObjectMetadataItem)) {
    throw new Error('mainObjectMetadataItem is required');
  }

  return (
    <>
      <StyledTimelineItemContainer>
        <StyledLeftContainer>
          <StyledIconContainer>
            <EventIconDynamicComponent
              event={event}
              linkedObjectMetadataItem={linkedObjectMetadataItem}
            />
          </StyledIconContainer>
          {!isLastEvent && (
            <StyledVerticalLineContainer>
              <StyledVerticalLine />
            </StyledVerticalLineContainer>
          )}
        </StyledLeftContainer>
        <StyledItemContainer isMarginBottom={!isLastEvent}>
          <StyledSummary>
            <EventRowDynamicComponent
              authorFullName={authorFullName}
              labelIdentifierValue={labelIdentifierValue}
              event={event}
              mainObjectMetadataItem={mainObjectMetadataItem}
              linkedObjectMetadataItem={linkedObjectMetadataItem}
            />
          </StyledSummary>
        </StyledItemContainer>
        <StyledItemTitleDate id={`id-${event.id}`}>
          {beautifiedCreatedAt}
        </StyledItemTitleDate>
      </StyledTimelineItemContainer>
    </>
  );
};
