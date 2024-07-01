import { BadRequestException, Injectable } from '@nestjs/common';

import { Request } from 'express';

import { DeleteQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/delete-query.factory';
import { ObjectMetadataService } from 'src/engine/metadata-modules/object-metadata/object-metadata.service';
import { TokenService } from 'src/engine/core-modules/auth/services/token.service';
import { CreateOneQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/create-one-query.factory';
import { UpdateQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/update-query.factory';
import { FindOneQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/find-one-query.factory';
import { FindManyQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/find-many-query.factory';
import { DeleteVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/delete-variables.factory';
import { CreateVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/create-variables.factory';
import { UpdateVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/update-variables.factory';
import { GetVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/get-variables.factory';
import { parseCorePath } from 'src/engine/api/rest/core/query-builder/utils/path-parsers/parse-core-path.utils';
import { computeDepth } from 'src/engine/api/rest/core/query-builder/utils/compute-depth.utils';
import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { Query } from 'src/engine/api/rest/core/types/query.type';
import { EnvironmentService } from 'src/engine/integrations/environment/environment.service';
import { CreateManyQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/create-many-query.factory';
import { parseCoreBatchPath } from 'src/engine/api/rest/core/query-builder/utils/path-parsers/parse-core-batch-path.utils';

@Injectable()
export class CoreQueryBuilderFactory {
  constructor(
    private readonly deleteQueryFactory: DeleteQueryFactory,
    private readonly createOneQueryFactory: CreateOneQueryFactory,
    private readonly createManyQueryFactory: CreateManyQueryFactory,
    private readonly updateQueryFactory: UpdateQueryFactory,
    private readonly findOneQueryFactory: FindOneQueryFactory,
    private readonly findManyQueryFactory: FindManyQueryFactory,
    private readonly deleteVariablesFactory: DeleteVariablesFactory,
    private readonly createVariablesFactory: CreateVariablesFactory,
    private readonly updateVariablesFactory: UpdateVariablesFactory,
    private readonly getVariablesFactory: GetVariablesFactory,
    private readonly objectMetadataService: ObjectMetadataService,
    private readonly tokenService: TokenService,
    private readonly environmentService: EnvironmentService,
  ) {}

  async getObjectMetadata(
    request: Request,
    parsedObject: string,
  ): Promise<{
    objectMetadataItems: ObjectMetadataEntity[];
    objectMetadataItem: ObjectMetadataEntity;
  }> {
    const { workspace } = await this.tokenService.validateToken(request);

    const objectMetadataItems =
      await this.objectMetadataService.findManyWithinWorkspace(workspace.id);

    if (!objectMetadataItems.length) {
      throw new BadRequestException(
        `No object was found for the workspace associated with this API key. You may generate a new one here ${this.environmentService.get(
          'FRONT_BASE_URL',
        )}/settings/developers`,
      );
    }

    const [objectMetadata] = objectMetadataItems.filter(
      (object) => object.namePlural === parsedObject,
    );

    if (!objectMetadata) {
      const [wrongObjectMetadata] = objectMetadataItems.filter(
        (object) => object.nameSingular === parsedObject,
      );

      let hint = 'eg: companies';

      if (wrongObjectMetadata) {
        hint = `Did you mean '${wrongObjectMetadata.namePlural}'?`;
      }

      throw new BadRequestException(
        `object '${parsedObject}' not found. ${hint}`,
      );
    }

    return {
      objectMetadataItems,
      objectMetadataItem: objectMetadata,
    };
  }

  async delete(request: Request): Promise<Query> {
    const { object: parsedObject } = parseCorePath(request);
    const objectMetadata = await this.getObjectMetadata(request, parsedObject);

    const { id } = parseCorePath(request);

    if (!id) {
      throw new BadRequestException(
        `delete ${objectMetadata.objectMetadataItem.nameSingular} query invalid. Id missing. eg: /rest/${objectMetadata.objectMetadataItem.namePlural}/0d4389ef-ea9c-4ae8-ada1-1cddc440fb56`,
      );
    }

    return {
      query: this.deleteQueryFactory.create(objectMetadata.objectMetadataItem),
      variables: this.deleteVariablesFactory.create(id),
    };
  }

  async createOne(request: Request): Promise<Query> {
    const { object: parsedObject } = parseCorePath(request);
    const objectMetadata = await this.getObjectMetadata(request, parsedObject);

    const depth = computeDepth(request);

    return {
      query: this.createOneQueryFactory.create(objectMetadata, depth),
      variables: this.createVariablesFactory.create(request),
    };
  }

  async createMany(request: Request): Promise<Query> {
    const { object: parsedObject } = parseCoreBatchPath(request);
    const objectMetadata = await this.getObjectMetadata(request, parsedObject);
    const depth = computeDepth(request);

    return {
      query: this.createManyQueryFactory.create(objectMetadata, depth),
      variables: this.createVariablesFactory.create(request),
    };
  }

  async update(request: Request): Promise<Query> {
    const { object: parsedObject } = parseCorePath(request);
    const objectMetadata = await this.getObjectMetadata(request, parsedObject);

    const depth = computeDepth(request);

    const { id } = parseCorePath(request);

    if (!id) {
      throw new BadRequestException(
        `update ${objectMetadata.objectMetadataItem.nameSingular} query invalid. Id missing. eg: /rest/${objectMetadata.objectMetadataItem.namePlural}/0d4389ef-ea9c-4ae8-ada1-1cddc440fb56`,
      );
    }

    return {
      query: this.updateQueryFactory.create(objectMetadata, depth),
      variables: this.updateVariablesFactory.create(id, request),
    };
  }

  async get(request: Request): Promise<Query> {
    const { object: parsedObject } = parseCorePath(request);
    const objectMetadata = await this.getObjectMetadata(request, parsedObject);

    const depth = computeDepth(request);

    const { id } = parseCorePath(request);

    return {
      query: id
        ? this.findOneQueryFactory.create(objectMetadata, depth)
        : this.findManyQueryFactory.create(objectMetadata, depth),
      variables: this.getVariablesFactory.create(id, request, objectMetadata),
    };
  }
}
