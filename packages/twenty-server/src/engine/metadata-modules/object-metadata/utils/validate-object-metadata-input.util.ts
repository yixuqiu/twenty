import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { UpdateObjectPayload } from 'src/engine/metadata-modules/object-metadata/dtos/update-object.input';
import {
  ObjectMetadataException,
  ObjectMetadataExceptionCode,
} from 'src/engine/metadata-modules/object-metadata/object-metadata.exception';
import {
  validateMetadataName,
  InvalidStringException,
} from 'src/engine/metadata-modules/utils/validate-metadata-name.utils';
import { camelCase } from 'src/utils/camel-case';

const coreObjectNames = [
  'appToken',
  'billingSubscription',
  'billingSubscriptions',
  'billingSubscriptionItem',
  'billingSubscriptionItems',
  'featureFlag',
  'user',
  'users',
  'userWorkspace',
  'userWorkspaces',
  'workspace',
  'workspaces',
];

const reservedKeywords = [
  ...coreObjectNames,
  'event',
  'events',
  'field',
  'fields',
  'link',
  'links',
  'currency',
  'currencies',
  'fullName',
  'fullNames',
  'address',
  'addresses',
];

export const validateObjectMetadataInputOrThrow = <
  T extends UpdateObjectPayload | CreateObjectInput,
>(
  objectMetadataInput: T,
): void => {
  validateNameCamelCasedOrThrow(objectMetadataInput.nameSingular);
  validateNameCamelCasedOrThrow(objectMetadataInput.namePlural);

  validateNameCharactersOrThrow(objectMetadataInput.nameSingular);
  validateNameCharactersOrThrow(objectMetadataInput.namePlural);

  validateNameIsNotReservedKeywordOrThrow(objectMetadataInput.nameSingular);
  validateNameIsNotReservedKeywordOrThrow(objectMetadataInput.namePlural);
};

const validateNameIsNotReservedKeywordOrThrow = (name?: string) => {
  if (name) {
    if (reservedKeywords.includes(name)) {
      throw new ObjectMetadataException(
        `The name "${name}" is not available`,
        ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
      );
    }
  }
};

const validateNameCamelCasedOrThrow = (name?: string) => {
  if (name) {
    if (name !== camelCase(name)) {
      throw new ObjectMetadataException(
        `Name should be in camelCase: ${name}`,
        ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
      );
    }
  }
};

const validateNameCharactersOrThrow = (name?: string) => {
  try {
    if (name) {
      validateMetadataName(name);
    }
  } catch (error) {
    if (error instanceof InvalidStringException) {
      throw new ObjectMetadataException(
        `Characters used in name "${name}" are not supported`,
        ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
      );
    } else {
      throw error;
    }
  }
};
