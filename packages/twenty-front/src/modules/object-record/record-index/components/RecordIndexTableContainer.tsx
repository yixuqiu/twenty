import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { RecordUpdateHookParams } from '@/object-record/record-field/contexts/FieldContext';
import { RecordTableActionBar } from '@/object-record/record-table/action-bar/components/RecordTableActionBar';
import { RecordTableWithWrappers } from '@/object-record/record-table/components/RecordTableWithWrappers';
import { RemoveSortingModal } from '@/object-record/record-table/components/RemoveSortingModal';
import { RecordTableContextMenu } from '@/object-record/record-table/context-menu/components/RecordTableContextMenu';

type RecordIndexTableContainerProps = {
  recordTableId: string;
  viewBarId: string;
  objectNameSingular: string;
  createRecord: () => Promise<void>;
};

export const RecordIndexTableContainer = ({
  recordTableId,
  viewBarId,
  objectNameSingular,
  createRecord,
}: RecordIndexTableContainerProps) => {
  const { updateOneRecord } = useUpdateOneRecord({
    objectNameSingular,
  });

  const updateEntity = ({ variables }: RecordUpdateHookParams) => {
    updateOneRecord?.({
      idToUpdate: variables.where.id as string,
      updateOneRecordInput: variables.updateOneRecordInput,
    });
  };

  return (
    <>
      <RecordTableWithWrappers
        recordTableId={recordTableId}
        objectNameSingular={objectNameSingular}
        viewBarId={viewBarId}
        updateRecordMutation={updateEntity}
        createRecord={createRecord}
      />
      <RecordTableActionBar recordTableId={recordTableId} />
      <RemoveSortingModal recordTableId={recordTableId} />
      <RecordTableContextMenu recordTableId={recordTableId} />
    </>
  );
};
