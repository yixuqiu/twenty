import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';

import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { MessageWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message.workspace-entity';

@Injectable()
export class MessageRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {}

  public async getNonAssociatedMessageIdsPaginated(
    limit: number,
    offset: number,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<string[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const nonAssociatedMessages =
      await this.workspaceDataSourceService.executeRawQuery(
        `SELECT m.id FROM ${dataSourceSchema}."message" m
        LEFT JOIN ${dataSourceSchema}."messageChannelMessageAssociation" mcma
        ON m.id = mcma."messageId"
        WHERE mcma.id IS NULL
        LIMIT $1 OFFSET $2`,
        [limit, offset],
        workspaceId,
        transactionManager,
      );

    return nonAssociatedMessages.map(({ id }) => id);
  }

  public async getFirstOrNullByHeaderMessageId(
    headerMessageId: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageWorkspaceEntity | null> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const messages = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."message" WHERE "headerMessageId" = $1 LIMIT 1`,
      [headerMessageId],
      workspaceId,
      transactionManager,
    );

    if (!messages || messages.length === 0) {
      return null;
    }

    return messages[0];
  }

  public async getByIds(
    messageIds: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageWorkspaceEntity[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."message" WHERE "id" = ANY($1)`,
      [messageIds],
      workspaceId,
      transactionManager,
    );
  }

  public async deleteByIds(
    messageIds: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    await this.workspaceDataSourceService.executeRawQuery(
      `DELETE FROM ${dataSourceSchema}."message" WHERE "id" = ANY($1)`,
      [messageIds],
      workspaceId,
      transactionManager,
    );
  }

  public async getByMessageThreadIds(
    messageThreadIds: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageWorkspaceEntity[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."message" WHERE "messageThreadId" = ANY($1)`,
      [messageThreadIds],
      workspaceId,
      transactionManager,
    );
  }

  public async insert(
    id: string,
    headerMessageId: string,
    subject: string,
    receivedAt: Date,
    messageDirection: string,
    messageThreadId: string,
    text: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}."message" ("id", "headerMessageId", "subject", "receivedAt", "direction", "messageThreadId", "text") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        headerMessageId,
        subject,
        receivedAt,
        messageDirection,
        messageThreadId,
        text,
      ],
      workspaceId,
      transactionManager,
    );
  }
}
