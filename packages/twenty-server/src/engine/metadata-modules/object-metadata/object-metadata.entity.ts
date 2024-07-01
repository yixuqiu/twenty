import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

import { ObjectMetadataInterface } from 'src/engine/metadata-modules/field-metadata/interfaces/object-metadata.interface';

import { FieldMetadataEntity } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RelationMetadataEntity } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { DataSourceEntity } from 'src/engine/metadata-modules/data-source/data-source.entity';
import { IndexMetadataEntity } from 'src/engine/metadata-modules/index-metadata/index-metadata.entity';

@Entity('objectMetadata')
@Unique('IndexOnNameSingularAndWorkspaceIdUnique', [
  'nameSingular',
  'workspaceId',
])
@Unique('IndexOnNamePluralAndWorkspaceIdUnique', ['namePlural', 'workspaceId'])
export class ObjectMetadataEntity implements ObjectMetadataInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'uuid' })
  standardId: string | null;

  @Column({ nullable: false, type: 'uuid' })
  dataSourceId: string;

  @Column({ nullable: false })
  nameSingular: string;

  @Column({ nullable: false })
  namePlural: string;

  @Column({ nullable: false })
  labelSingular: string;

  @Column({ nullable: false })
  labelPlural: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: false })
  targetTableName: string;

  @Column({ default: false })
  isCustom: boolean;

  @Column({ default: false })
  isRemote: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isSystem: boolean;

  @Column({ default: true })
  isAuditLogged: boolean;

  @Column({ nullable: true })
  labelIdentifierFieldMetadataId?: string;

  @Column({ nullable: true })
  imageIdentifierFieldMetadataId?: string;

  @Column({ nullable: false, type: 'uuid' })
  workspaceId: string;

  @OneToMany(() => FieldMetadataEntity, (field) => field.object, {
    cascade: true,
  })
  fields: Relation<FieldMetadataEntity[]>;

  @OneToMany(() => FieldMetadataEntity, (field) => field.object, {
    cascade: true,
  })
  indexes: Relation<IndexMetadataEntity[]>;

  @OneToMany(
    () => RelationMetadataEntity,
    (relation: RelationMetadataEntity) => relation.fromObjectMetadata,
    {
      cascade: true,
    },
  )
  fromRelations: Relation<RelationMetadataEntity[]>;

  @OneToMany(
    () => RelationMetadataEntity,
    (relation: RelationMetadataEntity) => relation.toObjectMetadata,
    {
      cascade: true,
    },
  )
  toRelations: Relation<RelationMetadataEntity[]>;

  @ManyToOne(() => DataSourceEntity, (dataSource) => dataSource.objects, {
    onDelete: 'CASCADE',
  })
  dataSource: Relation<DataSourceEntity>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
