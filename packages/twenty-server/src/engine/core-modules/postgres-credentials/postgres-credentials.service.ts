import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { randomBytes } from 'crypto';

import { Repository } from 'typeorm';

import {
  decryptText,
  encryptText,
} from 'src/engine/core-modules/auth/auth.util';
import { EnvironmentService } from 'src/engine/integrations/environment/environment.service';
import { PostgresCredentials } from 'src/engine/core-modules/postgres-credentials/postgres-credentials.entity';
import { NotFoundError } from 'src/engine/utils/graphql-errors.util';
import { PostgresCredentialsDTO } from 'src/engine/core-modules/postgres-credentials/dtos/postgres-credentials.dto';

export class PostgresCredentialsService {
  constructor(
    @InjectRepository(PostgresCredentials, 'core')
    private readonly postgresCredentialsRepository: Repository<PostgresCredentials>,
    private readonly environmentService: EnvironmentService,
  ) {}

  async enablePostgresProxy(
    workspaceId: string,
  ): Promise<PostgresCredentialsDTO> {
    const user = `user_${randomBytes(4).toString('hex')}`;
    const password = randomBytes(16).toString('hex');

    const key = this.environmentService.get('LOGIN_TOKEN_SECRET');
    const passwordHash = encryptText(password, key);

    const existingCredentials =
      await this.postgresCredentialsRepository.findOne({
        where: {
          workspaceId,
        },
      });

    if (existingCredentials) {
      throw new BadRequestException(
        'Postgres credentials already exist for this workspace',
      );
    }

    const postgresCredentials = await this.postgresCredentialsRepository.create(
      {
        user,
        passwordHash,
        workspaceId,
      },
    );

    await this.postgresCredentialsRepository.save(postgresCredentials);

    return {
      id: postgresCredentials.id,
      user,
      password,
      workspaceId,
    };
  }

  async disablePostgresProxy(
    workspaceId: string,
  ): Promise<PostgresCredentialsDTO> {
    const postgresCredentials =
      await this.postgresCredentialsRepository.findOne({
        where: {
          workspaceId,
        },
      });

    if (!postgresCredentials?.id) {
      throw new NotFoundError(
        'No valid Postgres credentials not found for this workspace',
      );
    }

    await this.postgresCredentialsRepository.delete({
      id: postgresCredentials.id,
    });

    const key = this.environmentService.get('LOGIN_TOKEN_SECRET');

    return {
      id: postgresCredentials.id,
      user: postgresCredentials.user,
      password: decryptText(postgresCredentials.passwordHash, key),
      workspaceId: postgresCredentials.workspaceId,
    };
  }

  async getPostgresCredentials(
    workspaceId: string,
  ): Promise<PostgresCredentialsDTO | null> {
    const postgresCredentials =
      await this.postgresCredentialsRepository.findOne({
        where: {
          workspaceId,
        },
      });

    if (!postgresCredentials) {
      return null;
    }

    const key = this.environmentService.get('LOGIN_TOKEN_SECRET');

    return {
      id: postgresCredentials.id,
      user: postgresCredentials.user,
      password: decryptText(postgresCredentials.passwordHash, key),
      workspaceId: postgresCredentials.workspaceId,
    };
  }
}
