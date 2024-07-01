import { Field, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { IDField } from '@ptc-org/nestjs-query-graphql';

import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';

export enum FeatureFlagKeys {
  IsBlocklistEnabled = 'IS_BLOCKLIST_ENABLED',
  IsEventObjectEnabled = 'IS_EVENT_OBJECT_ENABLED',
  IsAirtableIntegrationEnabled = 'IS_AIRTABLE_INTEGRATION_ENABLED',
  IsPostgreSQLIntegrationEnabled = 'IS_POSTGRESQL_INTEGRATION_ENABLED',
  IsStripeIntegrationEnabled = 'IS_STRIPE_INTEGRATION_ENABLED',
  IsContactCreationForSentAndReceivedEmailsEnabled = 'IS_CONTACT_CREATION_FOR_SENT_AND_RECEIVED_EMAILS_ENABLED',
  IsMessagingAliasFetchingEnabled = 'IS_MESSAGING_ALIAS_FETCHING_ENABLED',
  IsGoogleCalendarSyncV2Enabled = 'IS_GOOGLE_CALENDAR_SYNC_V2_ENABLED',
  IsFreeAccessEnabled = 'IS_FREE_ACCESS_ENABLED',
}

@Entity({ name: 'featureFlag', schema: 'core' })
@ObjectType('FeatureFlag')
@Unique('IndexOnKeyAndWorkspaceIdUnique', ['key', 'workspaceId'])
export class FeatureFlagEntity {
  @IDField(() => UUIDScalarType)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false, type: 'text' })
  key: FeatureFlagKeys;

  @Field()
  @Column({ nullable: false, type: 'uuid' })
  workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.featureFlags, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;

  @Field()
  @Column({ nullable: false })
  value: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
