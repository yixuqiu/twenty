import {
  RelationMetadataException,
  RelationMetadataExceptionCode,
} from 'src/engine/metadata-modules/relation-metadata/relation-metadata.exception';
import {
  UserInputError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from 'src/engine/utils/graphql-errors.util';

export const relationMetadataGraphqlApiExceptionHandler = (error: Error) => {
  if (error instanceof RelationMetadataException) {
    switch (error.code) {
      case RelationMetadataExceptionCode.RELATION_METADATA_NOT_FOUND:
        throw new NotFoundError(error.message);
      case RelationMetadataExceptionCode.INVALID_RELATION_INPUT:
        throw new UserInputError(error.message);
      case RelationMetadataExceptionCode.RELATION_ALREADY_EXISTS:
        throw new ConflictError(error.message);
      case RelationMetadataExceptionCode.FOREIGN_KEY_NOT_FOUND:
      default:
        throw new InternalServerError(error.message);
    }
  }

  throw error;
};
