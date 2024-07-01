import { checkFilterEnumValues } from 'src/engine/api/rest/core/query-builder/utils/filter-utils/check-filter-enum-values';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import {
  fieldSelectMock,
  objectMetadataItemMock,
} from 'src/engine/api/__mocks__/object-metadata-item.mock';

describe('checkFilterEnumValues', () => {
  it('should check properly', () => {
    expect(() =>
      checkFilterEnumValues(
        FieldMetadataType.SELECT,
        fieldSelectMock.name,
        'OPTION_1',
        objectMetadataItemMock,
      ),
    ).not.toThrow();

    expect(() =>
      checkFilterEnumValues(
        FieldMetadataType.SELECT,
        fieldSelectMock.name,
        'MISSING_OPTION',
        objectMetadataItemMock,
      ),
    ).toThrow(
      `'filter' enum value 'MISSING_OPTION' not available in '${fieldSelectMock.name}' enum. Available enum values are ['OPTION_1', 'OPTION_2']`,
    );
  });
});
