import { Injectable, Logger } from '@nestjs/common';

import {
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  In,
  ObjectLiteral,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { DeepPartial } from 'typeorm/common/DeepPartial';

import { PartialFieldMetadata } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/partial-field-metadata.interface';
import { PartialIndexMetadata } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/partial-index-metadata.interface';

import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import {
  FieldMetadataEntity,
  FieldMetadataType,
} from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RelationMetadataEntity } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { FieldMetadataComplexOption } from 'src/engine/metadata-modules/field-metadata/dtos/options.input';
import { WorkspaceSyncStorage } from 'src/engine/workspace-manager/workspace-sync-metadata/storage/workspace-sync.storage';
import { FieldMetadataUpdate } from 'src/engine/workspace-manager/workspace-migration-builder/factories/workspace-migration-field.factory';
import { ObjectMetadataUpdate } from 'src/engine/workspace-manager/workspace-migration-builder/factories/workspace-migration-object.factory';
import { IndexMetadataEntity } from 'src/engine/metadata-modules/index-metadata/index-metadata.entity';

@Injectable()
export class WorkspaceMetadataUpdaterService {
  private readonly logger = new Logger(WorkspaceMetadataUpdaterService.name);

  async updateObjectMetadata(
    manager: EntityManager,
    storage: WorkspaceSyncStorage,
  ): Promise<{
    createdObjectMetadataCollection: ObjectMetadataEntity[];
    updatedObjectMetadataCollection: ObjectMetadataUpdate[];
  }> {
    const objectMetadataRepository =
      manager.getRepository(ObjectMetadataEntity);

    /**
     * Create object metadata
     */
    const createdPartialObjectMetadataCollection =
      await objectMetadataRepository.save(
        storage.objectMetadataCreateCollection.map((objectMetadata) => ({
          ...objectMetadata,
          isActive: true,
          fields: objectMetadata.fields.map((field) =>
            this.prepareFieldMetadataForCreation(field),
          ),
        })) as DeepPartial<ObjectMetadataEntity>[],
      );
    const identifiers = createdPartialObjectMetadataCollection.map(
      (object) => object.id,
    );
    const createdObjectMetadataCollection = await manager.find(
      ObjectMetadataEntity,
      {
        where: { id: In(identifiers) },
        relations: ['dataSource', 'fields'],
      },
    );

    /**
     * Update object metadata
     */
    const updatedObjectMetadataCollection = await this.updateEntities(
      manager,
      ObjectMetadataEntity,
      storage.objectMetadataUpdateCollection,
      [
        'fields',
        'dataSourceId',
        'workspaceId',
        'labelIdentifierFieldMetadataId',
        'imageIdentifierFieldMetadataId',
      ],
    );

    /**
     * Delete object metadata
     */
    if (storage.objectMetadataDeleteCollection.length > 0) {
      await objectMetadataRepository.delete(
        storage.objectMetadataDeleteCollection.map((object) => object.id),
      );
    }

    return {
      createdObjectMetadataCollection,
      updatedObjectMetadataCollection,
    };
  }

  /**
   * TODO: Refactor this
   */
  private prepareFieldMetadataForCreation(field: PartialFieldMetadata) {
    return {
      ...field,
      ...(field.type === FieldMetadataType.SELECT && field.options
        ? {
            options: this.generateUUIDForNewSelectFieldOptions(
              field.options as FieldMetadataComplexOption[],
            ),
          }
        : {}),
      isActive: true,
    };
  }

  private generateUUIDForNewSelectFieldOptions(
    options: FieldMetadataComplexOption[],
  ): FieldMetadataComplexOption[] {
    return options.map((option) => ({
      ...option,
      id: uuidV4(),
    }));
  }

  async updateFieldMetadata(
    manager: EntityManager,
    storage: WorkspaceSyncStorage,
  ): Promise<{
    createdFieldMetadataCollection: FieldMetadataEntity[];
    updatedFieldMetadataCollection: FieldMetadataUpdate[];
  }> {
    const fieldMetadataRepository = manager.getRepository(FieldMetadataEntity);

    /**
     * Create field metadata
     */
    const createdFieldMetadataCollection = await fieldMetadataRepository.save(
      storage.fieldMetadataCreateCollection.map((field) =>
        this.prepareFieldMetadataForCreation(field),
      ) as DeepPartial<FieldMetadataEntity>[],
    );

    /**
     * Update field metadata
     */
    const updatedFieldMetadataCollection = await this.updateEntities<
      FieldMetadataEntity<'default'>
    >(manager, FieldMetadataEntity, storage.fieldMetadataUpdateCollection, [
      'objectMetadataId',
      'workspaceId',
    ]);

    /**
     * Delete field metadata
     */
    // TODO: handle relation fields deletion. We need to delete the relation metadata first due to the DB constraint.
    const fieldMetadataDeleteCollectionWithoutRelationType =
      storage.fieldMetadataDeleteCollection.filter(
        (field) => field.type !== FieldMetadataType.RELATION,
      );

    if (fieldMetadataDeleteCollectionWithoutRelationType.length > 0) {
      await fieldMetadataRepository.delete(
        fieldMetadataDeleteCollectionWithoutRelationType.map(
          (field) => field.id,
        ),
      );
    }

    return {
      createdFieldMetadataCollection:
        createdFieldMetadataCollection as FieldMetadataEntity[],
      updatedFieldMetadataCollection,
    };
  }

  async updateRelationMetadata(
    manager: EntityManager,
    storage: WorkspaceSyncStorage,
  ): Promise<{
    createdRelationMetadataCollection: RelationMetadataEntity[];
    updatedRelationMetadataCollection: RelationMetadataEntity[];
  }> {
    const relationMetadataRepository = manager.getRepository(
      RelationMetadataEntity,
    );
    const fieldMetadataRepository = manager.getRepository(FieldMetadataEntity);

    /**
     * Create relation metadata
     */
    const createdRelationMetadataCollection =
      await relationMetadataRepository.save(
        storage.relationMetadataCreateCollection,
      );

    /**
     * Update relation metadata
     */

    const updatedRelationMetadataCollection =
      await relationMetadataRepository.save(
        storage.relationMetadataUpdateCollection,
      );

    /**
     * Delete relation metadata
     */
    if (storage.relationMetadataDeleteCollection.length > 0) {
      await relationMetadataRepository.delete(
        storage.relationMetadataDeleteCollection.map(
          (relationMetadata) => relationMetadata.id,
        ),
      );
    }

    /**
     * Delete related field metadata
     */
    const fieldMetadataDeleteCollectionOnlyRelation =
      storage.fieldMetadataDeleteCollection.filter(
        (field) => field.type === FieldMetadataType.RELATION,
      );

    if (fieldMetadataDeleteCollectionOnlyRelation.length > 0) {
      await fieldMetadataRepository.delete(
        fieldMetadataDeleteCollectionOnlyRelation.map((field) => field.id),
      );
    }

    return {
      createdRelationMetadataCollection,
      updatedRelationMetadataCollection,
    };
  }

  async updateIndexMetadata(
    manager: EntityManager,
    storage: WorkspaceSyncStorage,
    originalObjectMetadataCollection: ObjectMetadataEntity[],
  ): Promise<{
    createdIndexMetadataCollection: IndexMetadataEntity[];
  }> {
    const indexMetadataRepository = manager.getRepository(IndexMetadataEntity);

    const convertIndexMetadataForSaving = (
      indexMetadata: PartialIndexMetadata,
    ) => {
      const convertIndexFieldMetadataForSaving = (
        column: string,
        order: number,
      ) => {
        const fieldMetadata = originalObjectMetadataCollection
          .find((object) => object.id === indexMetadata.objectMetadataId)
          ?.fields.find((field) => column === field.name);

        if (!fieldMetadata) {
          throw new Error(`
            Field metadata not found for column ${column} in object ${indexMetadata.objectMetadataId}
          `);
        }

        return {
          fieldMetadataId: fieldMetadata.id,
          order,
        };
      };

      return {
        ...indexMetadata,
        indexFieldMetadatas: indexMetadata.columns.map((column, index) =>
          convertIndexFieldMetadataForSaving(column, index),
        ),
      };
    };

    /**
     * Create index metadata
     */
    const createdIndexMetadataCollection = await indexMetadataRepository.save(
      storage.indexMetadataCreateCollection.map(convertIndexMetadataForSaving),
    );

    /**
     * Delete index metadata
     */
    if (storage.indexMetadataDeleteCollection.length > 0) {
      await indexMetadataRepository.delete(
        storage.indexMetadataDeleteCollection.map(
          (indexMetadata) => indexMetadata.id,
        ),
      );
    }

    return {
      createdIndexMetadataCollection,
    };
  }

  /**
   * Update entities in the database
   * @param manager EntityManager
   * @param entityClass Entity class
   * @param updateCollection Update collection
   * @param keysToOmit keys to omit in the merge process
   * @returns Promise<{ current: Entity; altered: Entity }[]>
   */
  private async updateEntities<Entity extends ObjectLiteral & { id: string }>(
    manager: EntityManager,
    entityClass: EntityTarget<Entity>,
    updateCollection: Array<
      DeepPartial<Omit<Entity, 'fields' | 'options' | 'settings'>> & {
        id: string;
      }
    >,
    keysToOmit: (keyof Entity)[] = [],
  ): Promise<{ current: Entity; altered: Entity }[]> {
    const repository = manager.getRepository(entityClass);

    const oldEntities = await repository.findBy({
      id: In(updateCollection.map((updateItem) => updateItem.id)),
    } as FindOptionsWhere<Entity>);

    // Pre-process old collection into a mapping for quick access
    const oldEntitiesMap = new Map(
      oldEntities.map((oldEntity) => [oldEntity.id, oldEntity]),
    );

    // Combine old and new field metadata to get whole updated entities
    const entityUpdateCollection = updateCollection.map((updateItem) => {
      const oldEntity = oldEntitiesMap.get(updateItem.id);

      if (!oldEntity) {
        throw new Error(`
              Entity ${updateItem.id} not found in oldEntities`);
      }

      // TypeORM 😢
      // If we didn't provide the old value, it will be set to null objects that are not in the updateObjectMetadata
      // and override the old value with null in the DB.
      // Also save method doesn't return the whole entity if you give a partial one.
      // https://github.com/typeorm/typeorm/issues/3490
      // To avoid calling update in a for loop, we did this hack.
      const mergedUpdate = {
        ...oldEntity,
        ...updateItem,
      };

      // Omit keys that we don't want to override
      keysToOmit.forEach((key) => {
        delete mergedUpdate[key];
      });

      return mergedUpdate;
    });

    const updatedEntities = await repository.save(entityUpdateCollection);

    return updatedEntities.map((updatedEntity) => {
      const oldEntity = oldEntitiesMap.get(updatedEntity.id);

      if (!oldEntity) {
        throw new Error(`
            Entity ${updatedEntity.id} not found in oldEntitiesMap
          `);
      }

      return {
        current: oldEntity,
        altered: {
          ...updatedEntity,
          ...keysToOmit.reduce(
            (acc, key) => ({ ...acc, [key]: oldEntity[key] }),
            {},
          ),
        },
      };
    });
  }
}
