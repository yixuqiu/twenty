import { useContext } from 'react';

import { useRecordFieldValue } from '@/object-record/record-store/contexts/RecordFieldValueSelectorContext';

import { FieldContext } from '../../contexts/FieldContext';
import { FieldAddressValue } from '../../types/FieldMetadata';

export const useAddressFieldDisplay = () => {
  const { entityId, fieldDefinition } = useContext(FieldContext);

  const fieldName = fieldDefinition.metadata.fieldName;

  const fieldValue = useRecordFieldValue<FieldAddressValue | undefined>(
    entityId,
    fieldName,
  );

  return {
    fieldDefinition,
    fieldValue,
  };
};
