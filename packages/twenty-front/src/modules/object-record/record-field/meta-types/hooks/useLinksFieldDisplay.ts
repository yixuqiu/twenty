import { useContext } from 'react';

import { FieldLinksValue } from '@/object-record/record-field/types/FieldMetadata';
import { useRecordFieldValue } from '@/object-record/record-store/contexts/RecordFieldValueSelectorContext';

import { FieldContext } from '../../contexts/FieldContext';

export const useLinksFieldDisplay = () => {
  const { entityId, fieldDefinition } = useContext(FieldContext);

  const fieldName = fieldDefinition.metadata.fieldName;

  const fieldValue = useRecordFieldValue<FieldLinksValue | undefined>(
    entityId,
    fieldName,
  );

  return {
    fieldDefinition,
    fieldValue,
  };
};
