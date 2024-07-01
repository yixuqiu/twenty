import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';

import { WorkspaceDataSourceService } from 'src/engine/workspace-datasource/workspace-datasource.service';
import { MessageChannelMessageAssociationWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-channel-message-association.workspace-entity';

@Injectable()
export class MessageChannelMessageAssociationRepository {
  constructor(
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {}

  public async getByMessageExternalIdsAndMessageChannelId(
    messageExternalIds: string[],
    messageChannelId: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageChannelMessageAssociationWorkspaceEntity[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."messageChannelMessageAssociation"
    WHERE "messageExternalId" = ANY($1) AND "messageChannelId" = $2`,
      [messageExternalIds, messageChannelId],
      workspaceId,
      transactionManager,
    );
  }

  public async countByMessageExternalIdsAndMessageChannelId(
    messageExternalIds: string[],
    messageChannelId: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<number> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const result = await this.workspaceDataSourceService.executeRawQuery(
      `SELECT COUNT(*) FROM ${dataSourceSchema}."messageChannelMessageAssociation"
    WHERE "messageExternalId" = ANY($1) AND "messageChannelId" = $2`,
      [messageExternalIds, messageChannelId],
      workspaceId,
      transactionManager,
    );

    return result[0]?.count;
  }

  public async deleteByMessageExternalIdsAndMessageChannelId(
    messageExternalIds: string[],
    messageChannelId: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ) {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    await this.workspaceDataSourceService.executeRawQuery(
      `DELETE FROM ${dataSourceSchema}."messageChannelMessageAssociation" WHERE "messageExternalId" = ANY($1) AND "messageChannelId" = $2`,
      [messageExternalIds, messageChannelId],
      workspaceId,
      transactionManager,
    );
  }

  public async deleteByMessageParticipantHandleAndMessageChannelIdAndRoles(
    messageParticipantHandle: string,
    messageChannelId: string,
    rolesToDelete: ('from' | 'to' | 'cc' | 'bcc')[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ) {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    const isHandleDomain = messageParticipantHandle.startsWith('@');

    const messageChannel =
      await this.workspaceDataSourceService.executeRawQuery(
        `SELECT * FROM ${dataSourceSchema}."messageChannel"
        WHERE "id" = $1`,
        [messageChannelId],
        workspaceId,
        transactionManager,
      );

    const messageChannelHandle = messageChannel[0].handle;

    const messageChannelMessageAssociationIdsToDelete =
      await this.workspaceDataSourceService.executeRawQuery(
        `SELECT "messageChannelMessageAssociation".id
      FROM ${dataSourceSchema}."messageChannelMessageAssociation" "messageChannelMessageAssociation"
      JOIN ${dataSourceSchema}."message" ON "messageChannelMessageAssociation"."messageId" = ${dataSourceSchema}."message"."id"
      JOIN ${dataSourceSchema}."messageParticipant" "messageParticipant" ON ${dataSourceSchema}."message"."id" = "messageParticipant"."messageId"
      WHERE "messageParticipant"."handle" != $1
      AND "messageParticipant"."handle" ${isHandleDomain ? '~*' : '='} $2
      AND "messageParticipant"."role" = ANY($3)
      AND "messageChannelMessageAssociation"."messageChannelId" = $4`,
        [
          messageChannelHandle,
          isHandleDomain
            ? // eslint-disable-next-line no-useless-escape
              `.+@(.+\.)?${messageParticipantHandle.slice(1)}`
            : messageParticipantHandle,
          rolesToDelete,
          messageChannelId,
        ],
        workspaceId,
        transactionManager,
      );

    const messageChannelMessageAssociationIdsToDeleteArray =
      messageChannelMessageAssociationIdsToDelete.map(
        (messageChannelMessageAssociation: { id: string }) =>
          messageChannelMessageAssociation.id,
      );

    await this.deleteByIds(
      messageChannelMessageAssociationIdsToDeleteArray,
      workspaceId,
      transactionManager,
    );
  }

  public async getByMessageChannelIds(
    messageChannelIds: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageChannelMessageAssociationWorkspaceEntity[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."messageChannelMessageAssociation"
    WHERE "messageChannelId" = ANY($1)`,
      [messageChannelIds],
      workspaceId,
      transactionManager,
    );
  }

  public async deleteByMessageChannelIds(
    messageChannelIds: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ) {
    if (messageChannelIds.length === 0) {
      return;
    }

    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    await this.workspaceDataSourceService.executeRawQuery(
      `DELETE FROM ${dataSourceSchema}."messageChannelMessageAssociation" WHERE "messageChannelId" = ANY($1)`,
      [messageChannelIds],
      workspaceId,
      transactionManager,
    );
  }

  public async deleteByIds(
    ids: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ) {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    await this.workspaceDataSourceService.executeRawQuery(
      `DELETE FROM ${dataSourceSchema}."messageChannelMessageAssociation" WHERE "id" = ANY($1)`,
      [ids],
      workspaceId,
      transactionManager,
    );
  }

  public async getByMessageThreadExternalIds(
    messageThreadExternalIds: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageChannelMessageAssociationWorkspaceEntity[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."messageChannelMessageAssociation"
    WHERE "messageThreadExternalId" = ANY($1)`,
      [messageThreadExternalIds],
      workspaceId,
      transactionManager,
    );
  }

  public async getFirstByMessageThreadExternalId(
    messageThreadExternalId: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageChannelMessageAssociationWorkspaceEntity | null> {
    const existingMessageChannelMessageAssociations =
      await this.getByMessageThreadExternalIds(
        [messageThreadExternalId],
        workspaceId,
        transactionManager,
      );

    if (
      !existingMessageChannelMessageAssociations ||
      existingMessageChannelMessageAssociations.length === 0
    ) {
      return null;
    }

    return existingMessageChannelMessageAssociations[0];
  }

  public async getByMessageIds(
    messageIds: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageChannelMessageAssociationWorkspaceEntity[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."messageChannelMessageAssociation"
    WHERE "messageId" = ANY($1)`,
      [messageIds],
      workspaceId,
      transactionManager,
    );
  }

  public async getByMessageThreadId(
    messageThreadId: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<MessageChannelMessageAssociationWorkspaceEntity[]> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    return await this.workspaceDataSourceService.executeRawQuery(
      `SELECT * FROM ${dataSourceSchema}."messageChannelMessageAssociation"
    WHERE "messageThreadId" = $1`,
      [messageThreadId],
      workspaceId,
      transactionManager,
    );
  }

  public async insert(
    messageChannelId: string,
    messageId: string,
    messageExternalId: string,
    messageThreadId: string,
    messageThreadExternalId: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const dataSourceSchema =
      this.workspaceDataSourceService.getSchemaName(workspaceId);

    await this.workspaceDataSourceService.executeRawQuery(
      `INSERT INTO ${dataSourceSchema}."messageChannelMessageAssociation" ("messageChannelId", "messageId", "messageExternalId", "messageThreadId", "messageThreadExternalId") VALUES ($1, $2, $3, $4, $5)`,
      [
        messageChannelId,
        messageId,
        messageExternalId,
        messageThreadId,
        messageThreadExternalId,
      ],
      workspaceId,
      transactionManager,
    );
  }
}
