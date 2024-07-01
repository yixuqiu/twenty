import { CustomException } from 'src/utils/custom-exception';

export class WorkspaceMigrationException extends CustomException {
  code: WorkspaceMigrationExceptionCode;
  constructor(message: string, code: WorkspaceMigrationExceptionCode) {
    super(message, code);
  }
}

export enum WorkspaceMigrationExceptionCode {
  NO_FACTORY_FOUND = 'NO_FACTORY_FOUND',
  INVALID_ACTION = 'INVALID_ACTION',
  INVALID_FIELD_METADATA = 'INVALID_FIELD_METADATA',
}
