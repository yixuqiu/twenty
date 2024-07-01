import { BadRequestException } from '@nestjs/common';

import { ObjectMetadataInterface } from 'src/engine/metadata-modules/field-metadata/interfaces/object-metadata.interface';
import { Record } from 'src/engine/api/graphql/workspace-query-builder/interfaces/record.interface';

import { compositeTypeDefintions } from 'src/engine/metadata-modules/field-metadata/composite-types';
import { isCompositeFieldMetadataType } from 'src/engine/metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util';
import { computeObjectTargetTable } from 'src/engine/utils/compute-object-target-table.util';

export const checkArrayFields = (
  objectMetadata: ObjectMetadataInterface,
  fields: Array<Partial<Record>>,
): void => {
  const fieldMetadataNames = objectMetadata.fields
    .map((field) => {
      if (isCompositeFieldMetadataType(field.type)) {
        const compositeType = compositeTypeDefintions.get(field.type);

        if (!compositeType) {
          throw new BadRequestException(
            `Composite type '${field.type}' not found`,
          );
        }

        return [
          field.name,
          compositeType.properties.map(
            (compositeProperty) => compositeProperty.name,
          ),
        ].flat();
      }

      return field.name;
    })
    .flat();

  for (const fieldObj of fields) {
    for (const fieldName in fieldObj) {
      if (!fieldMetadataNames.includes(fieldName)) {
        throw new BadRequestException(
          `field '${fieldName}' does not exist in '${computeObjectTargetTable(
            objectMetadata,
          )}' object`,
        );
      }
    }
  }
};
