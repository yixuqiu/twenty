import { Test, TestingModule } from '@nestjs/testing';

import { WorkspaceQueryRunnerOptions } from 'src/engine/api/graphql/workspace-query-runner/interfaces/query-runner-option.interface';
import { FieldMetadataInterface } from 'src/engine/metadata-modules/field-metadata/interfaces/field-metadata.interface';
import { ResolverArgsType } from 'src/engine/api/graphql/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';

import { QueryRunnerArgsFactory } from 'src/engine/api/graphql/workspace-query-runner/factories/query-runner-args.factory';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RecordPositionFactory } from 'src/engine/api/graphql/workspace-query-runner/factories/record-position.factory';

describe('QueryRunnerArgsFactory', () => {
  const recordPositionFactory = {
    create: jest.fn().mockResolvedValue(2),
  };
  const workspaceId = 'workspaceId';
  const options = {
    fieldMetadataCollection: [
      { name: 'position', type: FieldMetadataType.POSITION },
      { name: 'testNumber', type: FieldMetadataType.NUMBER },
    ] as FieldMetadataInterface[],
    objectMetadataItem: { isCustom: true, nameSingular: 'test' },
    workspaceId,
  } as WorkspaceQueryRunnerOptions;

  let factory: QueryRunnerArgsFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryRunnerArgsFactory,
        {
          provide: RecordPositionFactory,
          useValue: {
            create: recordPositionFactory.create,
          },
        },
      ],
    }).compile();

    factory = module.get<QueryRunnerArgsFactory>(QueryRunnerArgsFactory);
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  describe('create', () => {
    it('should simply return the args when data is an empty array', async () => {
      const args = {
        data: [],
      };
      const result = await factory.create(
        args,
        options,
        ResolverArgsType.CreateMany,
      );

      expect(result).toEqual(args);
    });

    it('createMany type should override data position and number', async () => {
      const args = {
        id: 'uuid',
        data: [{ position: 'last', testNumber: '1' }],
      };

      const result = await factory.create(
        args,
        options,
        ResolverArgsType.CreateMany,
      );

      expect(recordPositionFactory.create).toHaveBeenCalledWith(
        'last',
        { isCustom: true, nameSingular: 'test' },
        workspaceId,
        0,
      );
      expect(result).toEqual({
        id: 'uuid',
        data: [{ position: 2, testNumber: 1 }],
      });
    });

    it('createMany type should override position if not present', async () => {
      const args = {
        id: 'uuid',
        data: [{ testNumber: '1' }],
      };

      const result = await factory.create(
        args,
        options,
        ResolverArgsType.CreateMany,
      );

      expect(recordPositionFactory.create).toHaveBeenCalledWith(
        'first',
        { isCustom: true, nameSingular: 'test' },
        workspaceId,
        0,
      );
      expect(result).toEqual({
        id: 'uuid',
        data: [{ position: 2, testNumber: 1 }],
      });
    });

    it('findMany type should override data position and number', async () => {
      const args = {
        id: 'uuid',
        filter: { testNumber: { eq: '1' }, otherField: { eq: 'test' } },
      };

      const result = await factory.create(
        args,
        options,
        ResolverArgsType.FindMany,
      );

      expect(result).toEqual({
        id: 'uuid',
        filter: { testNumber: { eq: 1 }, otherField: { eq: 'test' } },
      });
    });

    it('findOne type should override number in filter', async () => {
      const args = {
        id: 'uuid',
        filter: { testNumber: { eq: '1' }, otherField: { eq: 'test' } },
      };

      const result = await factory.create(
        args,
        options,
        ResolverArgsType.FindOne,
      );

      expect(result).toEqual({
        id: 'uuid',
        filter: { testNumber: { eq: 1 }, otherField: { eq: 'test' } },
      });
    });

    it('findDuplicates type should override number in data and id', async () => {
      const optionsDuplicate = {
        fieldMetadataCollection: [
          { name: 'id', type: FieldMetadataType.NUMBER },
          { name: 'testNumber', type: FieldMetadataType.NUMBER },
        ] as FieldMetadataInterface[],
        objectMetadataItem: { isCustom: true, nameSingular: 'test' },
      } as WorkspaceQueryRunnerOptions;

      const args = {
        ids: ['123'],
        data: [{ testNumber: '1', otherField: 'test' }],
      };

      const result = await factory.create(
        args,
        optionsDuplicate,
        ResolverArgsType.FindDuplicates,
      );

      expect(result).toEqual({
        ids: [123],
        data: [{ testNumber: 1, position: 2, otherField: 'test' }],
      });
    });
  });
});
