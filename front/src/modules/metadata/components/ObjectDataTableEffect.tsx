import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';

import { TableRecoilScopeContext } from '@/ui/data/data-table/states/recoil-scope-contexts/TableRecoilScopeContext';
import { currentViewIdScopedState } from '@/ui/data/view-bar/states/currentViewIdScopedState';
import { filtersScopedState } from '@/ui/data/view-bar/states/filtersScopedState';
import { savedFiltersFamilyState } from '@/ui/data/view-bar/states/savedFiltersFamilyState';
import { savedSortsFamilyState } from '@/ui/data/view-bar/states/savedSortsFamilyState';
import { sortsScopedState } from '@/ui/data/view-bar/states/sortsScopedState';
import { useRecoilScopeId } from '@/ui/utilities/recoil-scope/hooks/useRecoilScopeId';

import { useFindManyObjects } from '../hooks/useFindManyObjects';
import { useSetObjectDataTableData } from '../hooks/useSetDataTableData';
import { MetadataObjectIdentifier } from '../types/MetadataObjectIdentifier';

export type ObjectDataTableEffectProps = MetadataObjectIdentifier;

export const ObjectDataTableEffect = ({
  objectNamePlural,
}: ObjectDataTableEffectProps) => {
  const setDataTableData = useSetObjectDataTableData();

  const { objects, loading } = useFindManyObjects({
    objectNamePlural,
  });

  useEffect(() => {
    if (!loading) {
      const entities = objects ?? [];

      setDataTableData(entities);
    }
  }, [objects, setDataTableData, loading]);

  const [searchParams] = useSearchParams();
  const tableRecoilScopeId = useRecoilScopeId(TableRecoilScopeContext);
  const handleViewSelect = useRecoilCallback(
    ({ set, snapshot }) =>
      async (viewId: string) => {
        const currentView = await snapshot.getPromise(
          currentViewIdScopedState(tableRecoilScopeId),
        );
        if (currentView === viewId) {
          return;
        }

        const savedFilters = await snapshot.getPromise(
          savedFiltersFamilyState(viewId),
        );
        const savedSorts = await snapshot.getPromise(
          savedSortsFamilyState(viewId),
        );

        set(filtersScopedState(tableRecoilScopeId), savedFilters);
        set(sortsScopedState(tableRecoilScopeId), savedSorts);
        set(currentViewIdScopedState(tableRecoilScopeId), viewId);
      },
    [tableRecoilScopeId],
  );

  useEffect(() => {
    const viewId = searchParams.get('view');
    if (viewId) {
      handleViewSelect(viewId);
    } else {
      handleViewSelect(objectNamePlural);
    }
  }, [handleViewSelect, searchParams, objectNamePlural]);

  return <></>;
};