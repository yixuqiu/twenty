import { TimelineActivity } from '@/activities/timelineActivities/types/TimelineActivity';
import { CurrentWorkspaceMember } from '@/auth/states/currentWorkspaceMemberState';
import { isDefined } from '~/utils/isDefined';

export const getTimelineActivityAuthorFullName = (
  event: TimelineActivity,
  currentWorkspaceMember: CurrentWorkspaceMember,
) => {
  if (isDefined(event.workspaceMember)) {
    return currentWorkspaceMember.id === event.workspaceMember.id
      ? 'You'
      : `${event.workspaceMember?.name.firstName} ${event.workspaceMember?.name.lastName}`;
  }
  return 'Twenty';
};
