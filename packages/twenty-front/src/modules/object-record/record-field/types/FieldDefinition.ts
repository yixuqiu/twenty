import { IconComponent } from 'twenty-ui';

import { FieldMetadataType } from '~/generated-metadata/graphql';

import { FieldMetadata } from './FieldMetadata';

export type FieldDefinitionRelationType =
  | 'FROM_MANY_OBJECTS'
  | 'FROM_ONE_OBJECT'
  | 'TO_MANY_OBJECTS'
  | 'TO_ONE_OBJECT';

export type RelationDirections = {
  from: FieldDefinitionRelationType;
  to: FieldDefinitionRelationType;
};

export type FieldDefinition<T extends FieldMetadata> = {
  fieldMetadataId: string;
  label: string;
  showLabel?: boolean;
  disableTooltip?: boolean;
  labelWidth?: number;
  iconName: string;
  type: FieldMetadataType;
  metadata: T;
  infoTooltipContent?: string;
  defaultValue?: any;
  editButtonIcon?: IconComponent;
};
