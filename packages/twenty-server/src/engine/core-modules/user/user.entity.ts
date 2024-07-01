import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Relation,
} from 'typeorm';
import { IDField } from '@ptc-org/nestjs-query-graphql';

import { AppToken } from 'src/engine/core-modules/app-token/app-token.entity';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { WorkspaceMember } from 'src/engine/core-modules/user/dtos/workspace-member.dto';
import { UserWorkspace } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';
import { KeyValuePair } from 'src/engine/core-modules/key-value-pair/key-value-pair.entity';
import { OnboardingStatus } from 'src/engine/core-modules/onboarding/enums/onboarding-status.enum';

registerEnumType(OnboardingStatus, {
  name: 'OnboardingStatus',
  description: 'Onboarding status',
});

@Entity({ name: 'user', schema: 'core' })
@ObjectType('User')
export class User {
  @IDField(() => UUIDScalarType)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ default: '' })
  firstName: string;

  @Field()
  @Column({ default: '' })
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  defaultAvatarUrl: string;

  @Field()
  @Column({ default: false })
  emailVerified: boolean;

  @Field({ nullable: true })
  @Column({ default: false })
  disabled: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passwordHash: string;

  @Field()
  @Column({ default: false })
  canImpersonate: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'timestamptz' })
  deletedAt: Date;

  @Field(() => Workspace, { nullable: false })
  @ManyToOne(() => Workspace, (workspace) => workspace.users, {
    onDelete: 'RESTRICT',
  })
  defaultWorkspace: Relation<Workspace>;

  @Field()
  @Column()
  defaultWorkspaceId: string;

  @Field({
    nullable: true,
    deprecationReason:
      'field migrated into the AppTokens Table ref: https://github.com/twentyhq/twenty/issues/5021',
  })
  @Column({ nullable: true })
  passwordResetToken: string;

  @Field({
    nullable: true,
    deprecationReason:
      'field migrated into the AppTokens Table ref: https://github.com/twentyhq/twenty/issues/5021',
  })
  @Column({ nullable: true, type: 'timestamptz' })
  passwordResetTokenExpiresAt: Date;

  @OneToMany(() => AppToken, (appToken) => appToken.user, {
    cascade: true,
  })
  appTokens: Relation<AppToken[]>;

  @OneToMany(() => KeyValuePair, (keyValuePair) => keyValuePair.user, {
    cascade: true,
  })
  keyValuePairs: Relation<KeyValuePair[]>;

  @Field(() => WorkspaceMember, { nullable: true })
  workspaceMember: Relation<WorkspaceMember>;

  @Field(() => [UserWorkspace])
  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.user)
  workspaces: Relation<UserWorkspace[]>;

  @Field(() => OnboardingStatus, { nullable: true })
  onboardingStatus: OnboardingStatus;
}
