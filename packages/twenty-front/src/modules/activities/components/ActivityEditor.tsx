import { useRef } from 'react';
import styled from '@emotion/styled';

import { ActivityBodyEditor } from '@/activities/components/ActivityBodyEditor';
import { ActivityBodyEffect } from '@/activities/components/ActivityBodyEffect';
import { ActivityComments } from '@/activities/components/ActivityComments';
import { ActivityCreationDate } from '@/activities/components/ActivityCreationDate';
import { ActivityEditorFields } from '@/activities/components/ActivityEditorFields';
import { ActivityTitleEffect } from '@/activities/components/ActivityTitleEffect';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';

import { ActivityTitle } from './ActivityTitle';

import '@blocknote/core/style.css';

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledUpperPartContainer = styled.div`
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledTopContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  background: ${({ theme }) => theme.background.secondary};
  border-bottom: ${({ theme }) =>
    useIsMobile() ? 'none' : `1px solid ${theme.border.color.medium}`};
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: ${({ theme }) => theme.spacing(6)};
`;

type ActivityEditorProps = {
  activityId: string;
  showComment?: boolean;
  fillTitleFromBody?: boolean;
};

export const ActivityEditor = ({
  activityId,
  showComment = true,
  fillTitleFromBody = false,
}: ActivityEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <StyledContainer ref={containerRef}>
      <StyledUpperPartContainer>
        <StyledTopContainer>
          <ActivityTitleEffect activityId={activityId} />
          <StyledTitleContainer>
            <ActivityTitle activityId={activityId} />
            <ActivityCreationDate activityId={activityId} />
          </StyledTitleContainer>
          <ActivityEditorFields activityId={activityId} />
        </StyledTopContainer>
      </StyledUpperPartContainer>
      <ActivityBodyEffect activityId={activityId} />
      <ActivityBodyEditor
        activityId={activityId}
        fillTitleFromBody={fillTitleFromBody}
      />
      {showComment && (
        <ActivityComments
          activityId={activityId}
          scrollableContainerRef={containerRef}
        />
      )}
    </StyledContainer>
  );
};
