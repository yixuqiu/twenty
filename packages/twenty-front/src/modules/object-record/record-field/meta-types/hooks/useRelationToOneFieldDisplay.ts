import { useContext } from 'react';
import { isNonEmptyString } from '@sniptt/guards';

import { PreComputedChipGeneratorsContext } from '@/object-metadata/context/PreComputedChipGeneratorsContext';
import { generateDefaultRecordChipData } from '@/object-metadata/utils/generateDefaultRecordChipData';
import { useRecordFieldValue } from '@/object-record/record-store/contexts/RecordFieldValueSelectorContext';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { FIELD_EDIT_BUTTON_WIDTH } from '@/ui/field/display/constants/FieldEditButtonWidth';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import { isDefined } from '~/utils/isDefined';

import { FieldContext } from '../../contexts/FieldContext';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldRelation } from '../../types/guards/isFieldRelation';

export const useRelationToOneFieldDisplay = () => {
  const { entityId, fieldDefinition, maxWidth } = useContext(FieldContext);

  const { chipGeneratorPerObjectPerField } = useContext(
    PreComputedChipGeneratorsContext,
  );

  if (!isDefined(chipGeneratorPerObjectPerField)) {
    throw new Error('Chip generator per object per field is not defined');
  }

  assertFieldMetadata(
    FieldMetadataType.Relation,
    isFieldRelation,
    fieldDefinition,
  );

  const button = fieldDefinition.editButtonIcon;

  const fieldName = fieldDefinition.metadata.fieldName;

  const fieldValue = useRecordFieldValue<ObjectRecord | undefined>(
    entityId,
    fieldName,
  );

  const maxWidthForField =
    isDefined(button) && isDefined(maxWidth)
      ? maxWidth - FIELD_EDIT_BUTTON_WIDTH
      : maxWidth;

  if (!isNonEmptyString(fieldDefinition.metadata.objectMetadataNameSingular)) {
    throw new Error('Object metadata name singular is not a non-empty string');
  }

  const generateRecordChipData =
    chipGeneratorPerObjectPerField[
      fieldDefinition.metadata.objectMetadataNameSingular
    ]?.[fieldDefinition.metadata.fieldName] ?? generateDefaultRecordChipData;

  return {
    fieldDefinition,
    fieldValue,
    maxWidth: maxWidthForField,
    entityId,
    generateRecordChipData,
  };
};
