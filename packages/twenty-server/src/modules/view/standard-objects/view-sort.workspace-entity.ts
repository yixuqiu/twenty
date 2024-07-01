import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { VIEW_SORT_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { ViewWorkspaceEntity } from 'src/modules/view/standard-objects/view.workspace-entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.viewSort,
  namePlural: 'viewSorts',
  labelSingular: 'View Sort',
  labelPlural: 'View Sorts',
  description: '(System) View Sorts',
  icon: 'IconArrowsSort',
})
@WorkspaceIsNotAuditLogged()
@WorkspaceIsSystem()
export class ViewSortWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: VIEW_SORT_STANDARD_FIELD_IDS.fieldMetadataId,
    type: FieldMetadataType.UUID,
    label: 'Field Metadata Id',
    description: 'View Sort target field',
    icon: 'IconTag',
  })
  fieldMetadataId: string;

  @WorkspaceField({
    standardId: VIEW_SORT_STANDARD_FIELD_IDS.direction,
    type: FieldMetadataType.TEXT,
    label: 'Direction',
    description: 'View Sort direction',
    defaultValue: "'asc'",
  })
  direction: string;

  @WorkspaceRelation({
    standardId: VIEW_SORT_STANDARD_FIELD_IDS.view,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'View',
    description: 'View Sort related view',
    icon: 'IconLayoutCollage',
    inverseSideTarget: () => ViewWorkspaceEntity,
    inverseSideFieldKey: 'viewSorts',
  })
  @WorkspaceIsNullable()
  view: Relation<ViewWorkspaceEntity> | null;

  @WorkspaceJoinColumn('view')
  viewId: string | null;
}
