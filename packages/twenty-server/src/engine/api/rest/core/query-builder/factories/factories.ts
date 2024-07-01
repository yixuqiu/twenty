import { DeleteQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/delete-query.factory';
import { CreateOneQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/create-one-query.factory';
import { UpdateQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/update-query.factory';
import { FindOneQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/find-one-query.factory';
import { FindManyQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/find-many-query.factory';
import { DeleteVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/delete-variables.factory';
import { CreateVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/create-variables.factory';
import { UpdateVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/update-variables.factory';
import { GetVariablesFactory } from 'src/engine/api/rest/core/query-builder/factories/get-variables.factory';
import { CreateManyQueryFactory } from 'src/engine/api/rest/core/query-builder/factories/create-many-query.factory';
import { inputFactories } from 'src/engine/api/rest/input-factories/factories';

export const coreQueryBuilderFactories = [
  DeleteQueryFactory,
  CreateOneQueryFactory,
  CreateManyQueryFactory,
  UpdateQueryFactory,
  FindOneQueryFactory,
  FindManyQueryFactory,
  DeleteVariablesFactory,
  CreateVariablesFactory,
  UpdateVariablesFactory,
  GetVariablesFactory,
  ...inputFactories,
];
