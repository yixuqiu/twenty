import styled from '@emotion/styled';
import { H1Title, H1TitleFontColor } from 'twenty-ui';

import { CustomResolverFetchMoreLoader } from '@/activities/components/CustomResolverFetchMoreLoader';
import { SkeletonLoader } from '@/activities/components/SkeletonLoader';
import { EmailThreadPreview } from '@/activities/emails/components/EmailThreadPreview';
import { TIMELINE_THREADS_DEFAULT_PAGE_SIZE } from '@/activities/emails/constants/Messaging';
import { getTimelineThreadsFromCompanyId } from '@/activities/emails/queries/getTimelineThreadsFromCompanyId';
import { getTimelineThreadsFromPersonId } from '@/activities/emails/queries/getTimelineThreadsFromPersonId';
import { useCustomResolver } from '@/activities/hooks/useCustomResolver';
import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import AnimatedPlaceholder from '@/ui/layout/animated-placeholder/components/AnimatedPlaceholder';
import {
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptySubTitle,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
  EMPTY_PLACEHOLDER_TRANSITION_PROPS,
} from '@/ui/layout/animated-placeholder/components/EmptyPlaceholderStyled';
import { Card } from '@/ui/layout/card/components/Card';
import { Section } from '@/ui/layout/section/components/Section';
import { TimelineThread, TimelineThreadsWithTotal } from '~/generated/graphql';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(6, 6, 2)};
  height: 100%;
  overflow: auto;
`;

const StyledH1Title = styled(H1Title)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledEmailCount = styled.span`
  color: ${({ theme }) => theme.font.color.light};
`;

export const EmailThreads = ({
  targetableObject,
}: {
  targetableObject: ActivityTargetableObject;
}) => {
  const [query, queryName] =
    targetableObject.targetObjectNameSingular === CoreObjectNameSingular.Person
      ? [getTimelineThreadsFromPersonId, 'getTimelineThreadsFromPersonId']
      : [getTimelineThreadsFromCompanyId, 'getTimelineThreadsFromCompanyId'];

  const { data, firstQueryLoading, isFetchingMore, fetchMoreRecords } =
    useCustomResolver<TimelineThreadsWithTotal>(
      query,
      queryName,
      'timelineThreads',
      targetableObject,
      TIMELINE_THREADS_DEFAULT_PAGE_SIZE,
    );

  const { totalNumberOfThreads, timelineThreads } = data?.[queryName] ?? {};

  if (firstQueryLoading) {
    return <SkeletonLoader />;
  }

  if (!firstQueryLoading && !timelineThreads?.length) {
    return (
      <AnimatedPlaceholderEmptyContainer
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...EMPTY_PLACEHOLDER_TRANSITION_PROPS}
      >
        <AnimatedPlaceholder type="emptyInbox" />
        <AnimatedPlaceholderEmptyTextContainer>
          <AnimatedPlaceholderEmptyTitle>
            Empty Inbox
          </AnimatedPlaceholderEmptyTitle>
          <AnimatedPlaceholderEmptySubTitle>
            No email exchange has occurred with this record yet.
          </AnimatedPlaceholderEmptySubTitle>
        </AnimatedPlaceholderEmptyTextContainer>
      </AnimatedPlaceholderEmptyContainer>
    );
  }

  return (
    <StyledContainer>
      <Section>
        <StyledH1Title
          title={
            <>
              Inbox <StyledEmailCount>{totalNumberOfThreads}</StyledEmailCount>
            </>
          }
          fontColor={H1TitleFontColor.Primary}
        />
        {!firstQueryLoading && (
          <Card>
            {timelineThreads?.map((thread: TimelineThread, index: number) => (
              <EmailThreadPreview
                key={index}
                divider={index < timelineThreads.length - 1}
                thread={thread}
              />
            ))}
          </Card>
        )}
        <CustomResolverFetchMoreLoader
          loading={isFetchingMore || firstQueryLoading}
          onLastRowVisible={fetchMoreRecords}
        />
      </Section>
    </StyledContainer>
  );
};
