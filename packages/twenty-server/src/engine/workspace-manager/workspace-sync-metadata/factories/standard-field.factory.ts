import { Injectable } from '@nestjs/common';

import { WorkspaceSyncContext } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/workspace-sync-context.interface';
import { FeatureFlagMap } from 'src/engine/core-modules/feature-flag/interfaces/feature-flag-map.interface';
import {
  PartialComputedFieldMetadata,
  PartialFieldMetadata,
} from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/partial-field-metadata.interface';
import { WorkspaceEntityMetadataArgs } from 'src/engine/twenty-orm/interfaces/workspace-entity-metadata-args.interface';
import { WorkspaceFieldMetadataArgs } from 'src/engine/twenty-orm/interfaces/workspace-field-metadata-args.interface';
import { WorkspaceDynamicRelationMetadataArgs } from 'src/engine/twenty-orm/interfaces/workspace-dynamic-relation-metadata-args.interface';
import { WorkspaceRelationMetadataArgs } from 'src/engine/twenty-orm/interfaces/workspace-relation-metadata-args.interface';

import { isGatedAndNotEnabled } from 'src/engine/workspace-manager/workspace-sync-metadata/utils/is-gate-and-not-enabled.util';
import { metadataArgsStorage } from 'src/engine/twenty-orm/storage/metadata-args.storage';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { createDeterministicUuid } from 'src/engine/workspace-manager/workspace-sync-metadata/utils/create-deterministic-uuid.util';
import { getJoinColumn } from 'src/engine/twenty-orm/utils/get-join-column.util';

@Injectable()
export class StandardFieldFactory {
  create(
    target: typeof BaseWorkspaceEntity,
    context: WorkspaceSyncContext,
    workspaceFeatureFlagsMap: FeatureFlagMap,
  ): Array<PartialFieldMetadata | PartialComputedFieldMetadata> {
    const workspaceEntityMetadataArgs =
      metadataArgsStorage.filterEntities(target);
    const metadataCollections = this.collectMetadata(target);

    return [
      ...this.processMetadata(
        workspaceEntityMetadataArgs,
        metadataCollections.fields,
        context,
        workspaceFeatureFlagsMap,
        this.createFieldMetadata,
      ),
      ...this.processMetadata(
        workspaceEntityMetadataArgs,
        metadataCollections.relations,
        context,
        workspaceFeatureFlagsMap,
        this.createFieldRelationMetadata,
      ),
      ...this.processMetadata(
        workspaceEntityMetadataArgs,
        metadataCollections.dynamicRelations,
        context,
        workspaceFeatureFlagsMap,
        this.createComputedFieldRelationMetadata,
      ),
    ];
  }

  private collectMetadata(target: typeof BaseWorkspaceEntity) {
    return {
      fields: metadataArgsStorage.filterFields(target),
      relations: metadataArgsStorage.filterRelations(target),
      dynamicRelations: metadataArgsStorage.filterDynamicRelations(target),
    };
  }

  private processMetadata<
    T,
    U extends PartialFieldMetadata | PartialComputedFieldMetadata,
  >(
    workspaceEntityMetadataArgs: WorkspaceEntityMetadataArgs | undefined,
    metadataArgs: T[],
    context: WorkspaceSyncContext,
    featureFlagsMap: FeatureFlagMap,
    createMetadata: (
      workspaceEntityMetadataArgs: WorkspaceEntityMetadataArgs | undefined,
      args: T,
      context: WorkspaceSyncContext,
      featureFlagsMap: FeatureFlagMap,
    ) => U[],
  ): U[] {
    return metadataArgs
      .flatMap((args) =>
        createMetadata(
          workspaceEntityMetadataArgs,
          args,
          context,
          featureFlagsMap,
        ),
      )
      .filter(Boolean) as U[];
  }

  /**
   * Create field metadata
   */
  private createFieldMetadata(
    workspaceEntityMetadataArgs: WorkspaceEntityMetadataArgs | undefined,
    workspaceFieldMetadataArgs: WorkspaceFieldMetadataArgs,
    context: WorkspaceSyncContext,
    workspaceFeatureFlagsMap: FeatureFlagMap,
  ): PartialFieldMetadata[] {
    if (
      isGatedAndNotEnabled(
        workspaceFieldMetadataArgs.gate,
        workspaceFeatureFlagsMap,
      )
    ) {
      return [];
    }

    return [
      {
        type: workspaceFieldMetadataArgs.type,
        standardId: workspaceFieldMetadataArgs.standardId,
        name: workspaceFieldMetadataArgs.name,
        icon: workspaceFieldMetadataArgs.icon,
        label: workspaceFieldMetadataArgs.label,
        description: workspaceFieldMetadataArgs.description,
        defaultValue: workspaceFieldMetadataArgs.defaultValue,
        options: workspaceFieldMetadataArgs.options,
        workspaceId: context.workspaceId,
        isNullable: workspaceFieldMetadataArgs.isNullable,
        isCustom: false,
        isSystem:
          workspaceEntityMetadataArgs?.isSystem ||
          workspaceFieldMetadataArgs.isSystem,
      },
    ];
  }

  /**
   * Create relation field metadata
   */
  private createFieldRelationMetadata(
    workspaceEntityMetadataArgs: WorkspaceEntityMetadataArgs | undefined,
    workspaceRelationMetadataArgs: WorkspaceRelationMetadataArgs,
    context: WorkspaceSyncContext,
    workspaceFeatureFlagsMap: FeatureFlagMap,
  ): PartialFieldMetadata[] {
    const fieldMetadataCollection: PartialFieldMetadata[] = [];
    const foreignKeyStandardId = createDeterministicUuid(
      workspaceRelationMetadataArgs.standardId,
    );
    const joinColumnMetadataArgsCollection =
      metadataArgsStorage.filterJoinColumns(
        workspaceRelationMetadataArgs.target,
      );
    const joinColumn = getJoinColumn(
      joinColumnMetadataArgsCollection,
      workspaceRelationMetadataArgs,
    );

    if (
      isGatedAndNotEnabled(
        workspaceRelationMetadataArgs.gate,
        workspaceFeatureFlagsMap,
      )
    ) {
      return [];
    }

    if (joinColumn) {
      fieldMetadataCollection.push({
        type: FieldMetadataType.UUID,
        standardId: foreignKeyStandardId,
        name: joinColumn,
        label: `${workspaceRelationMetadataArgs.label} id (foreign key)`,
        description: `${workspaceRelationMetadataArgs.description} id foreign key`,
        icon: workspaceRelationMetadataArgs.icon,
        defaultValue: null,
        options: undefined,
        settings: undefined,
        workspaceId: context.workspaceId,
        isCustom: false,
        isSystem: true,
        isNullable: workspaceRelationMetadataArgs.isNullable,
      });
    }

    fieldMetadataCollection.push({
      type: FieldMetadataType.RELATION,
      standardId: workspaceRelationMetadataArgs.standardId,
      name: workspaceRelationMetadataArgs.name,
      label: workspaceRelationMetadataArgs.label,
      description: workspaceRelationMetadataArgs.description,
      icon: workspaceRelationMetadataArgs.icon,
      defaultValue: null,
      workspaceId: context.workspaceId,
      isCustom: false,
      isSystem:
        workspaceEntityMetadataArgs?.isSystem ||
        workspaceRelationMetadataArgs.isSystem,
      isNullable: true,
    });

    return fieldMetadataCollection;
  }

  /**
   * Create computed field relation metadata
   */
  private createComputedFieldRelationMetadata(
    workspaceEntityMetadataArgs: WorkspaceEntityMetadataArgs | undefined,
    workspaceDynamicRelationMetadataArgs:
      | WorkspaceDynamicRelationMetadataArgs
      | undefined,
    context: WorkspaceSyncContext,
    workspaceFeatureFlagsMap: FeatureFlagMap,
  ): PartialComputedFieldMetadata[] {
    if (
      !workspaceDynamicRelationMetadataArgs ||
      isGatedAndNotEnabled(
        workspaceDynamicRelationMetadataArgs.gate,
        workspaceFeatureFlagsMap,
      )
    ) {
      return [];
    }

    return [
      // Foreign key will be computed in compute-standard-object.util.ts, because we need to know the custom object
      {
        type: FieldMetadataType.RELATION,
        argsFactory: workspaceDynamicRelationMetadataArgs.argsFactory,
        workspaceId: context.workspaceId,
        isCustom: false,
        isSystem:
          workspaceEntityMetadataArgs?.isSystem ||
          workspaceDynamicRelationMetadataArgs.isSystem,
        isNullable: workspaceDynamicRelationMetadataArgs.isNullable,
      },
    ];
  }
}
