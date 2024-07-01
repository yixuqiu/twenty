import { TimelineActivity } from '@/activities/timelineActivities/types/TimelineActivity';
import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { getActivityTargetObjectFieldIdName } from '@/activities/utils/getActivityTargetObjectFieldIdName';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';

// do we need to test this?
export const useTimelineActivities = (
  targetableObject: ActivityTargetableObject,
) => {
  const targetableObjectFieldIdName = getActivityTargetObjectFieldIdName({
    nameSingular: targetableObject.targetObjectNameSingular,
  });

  const {
    records: TimelineActivities,
    loading,
    fetchMoreRecords,
  } = useFindManyRecords({
    objectNameSingular: CoreObjectNameSingular.TimelineActivity,
    filter: {
      [targetableObjectFieldIdName]: {
        eq: targetableObject.id,
      },
    },
    orderBy: [
      {
        createdAt: 'DescNullsFirst',
      },
    ],
    recordGqlFields: {
      id: true,
      createdAt: true,
      linkedObjectMetadataId: true,
      linkedRecordCachedName: true,
      linkedRecordId: true,
      name: true,
      properties: true,
      happensAt: true,
      workspaceMember: true,
      person: true,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    timelineActivities: TimelineActivities as TimelineActivity[],
    loading,
    fetchMoreRecords,
  };
};
