import { ApolloCache, StoreObject } from '@apollo/client';

import { triggerUpdateRelationsOptimisticEffect } from '@/apollo/optimistic-effect/utils/triggerUpdateRelationsOptimisticEffect';
import { CachedObjectRecordQueryVariables } from '@/apollo/types/CachedObjectRecordQueryVariables';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { RecordGqlRefEdge } from '@/object-record/cache/types/RecordGqlRefEdge';
import { isObjectRecordConnectionWithRefs } from '@/object-record/cache/utils/isObjectRecordConnectionWithRefs';
import { RecordGqlNode } from '@/object-record/graphql/types/RecordGqlNode';
import { isDefined } from '~/utils/isDefined';
import { parseApolloStoreFieldName } from '~/utils/parseApolloStoreFieldName';

export const triggerDeleteRecordsOptimisticEffect = ({
  cache,
  objectMetadataItem,
  recordsToDelete,
  objectMetadataItems,
}: {
  cache: ApolloCache<unknown>;
  objectMetadataItem: ObjectMetadataItem;
  recordsToDelete: RecordGqlNode[];
  objectMetadataItems: ObjectMetadataItem[];
}) => {
  cache.modify<StoreObject>({
    fields: {
      [objectMetadataItem.namePlural]: (
        rootQueryCachedResponse,
        { DELETE, readField, storeFieldName },
      ) => {
        const rootQueryCachedResponseIsNotACachedObjectRecordConnection =
          !isObjectRecordConnectionWithRefs(
            objectMetadataItem.nameSingular,
            rootQueryCachedResponse,
          );

        if (rootQueryCachedResponseIsNotACachedObjectRecordConnection) {
          return rootQueryCachedResponse;
        }

        const rootQueryCachedObjectRecordConnection = rootQueryCachedResponse;

        const { fieldVariables: rootQueryVariables } =
          parseApolloStoreFieldName<CachedObjectRecordQueryVariables>(
            storeFieldName,
          );

        const recordIdsToDelete = recordsToDelete.map(({ id }) => id);

        const cachedEdges = readField<RecordGqlRefEdge[]>(
          'edges',
          rootQueryCachedObjectRecordConnection,
        );

        const totalCount = readField<number | undefined>(
          'totalCount',
          rootQueryCachedObjectRecordConnection,
        );

        const nextCachedEdges =
          cachedEdges?.filter((cachedEdge) => {
            const nodeId = readField<string>('id', cachedEdge.node);

            return nodeId && !recordIdsToDelete.includes(nodeId);
          }) || [];

        if (nextCachedEdges.length === cachedEdges?.length)
          return rootQueryCachedObjectRecordConnection;

        // TODO: same as in update, should we trigger DELETE ?
        if (
          isDefined(rootQueryVariables?.first) &&
          cachedEdges?.length === rootQueryVariables.first
        ) {
          return DELETE;
        }

        return {
          ...rootQueryCachedObjectRecordConnection,
          edges: nextCachedEdges,
          totalCount: isDefined(totalCount)
            ? totalCount - recordIdsToDelete.length
            : undefined,
        };
      },
    },
  });

  recordsToDelete.forEach((recordToDelete) => {
    triggerUpdateRelationsOptimisticEffect({
      cache,
      sourceObjectMetadataItem: objectMetadataItem,
      currentSourceRecord: recordToDelete,
      updatedSourceRecord: null,
      objectMetadataItems,
    });

    cache.evict({ id: cache.identify(recordToDelete) });
  });
};
