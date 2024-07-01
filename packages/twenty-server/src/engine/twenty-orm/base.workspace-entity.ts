import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsPimaryField } from 'src/engine/twenty-orm/decorators/workspace-is-primary-field.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { BASE_OBJECT_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';

export abstract class BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: BASE_OBJECT_STANDARD_FIELD_IDS.id,
    type: FieldMetadataType.UUID,
    label: 'Id',
    description: 'Id',
    defaultValue: 'uuid',
    icon: 'Icon123',
  })
  @WorkspaceIsPimaryField()
  @WorkspaceIsSystem()
  id: string;

  @WorkspaceField({
    standardId: BASE_OBJECT_STANDARD_FIELD_IDS.createdAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Creation date',
    description: 'Creation date',
    icon: 'IconCalendar',
    defaultValue: 'now',
  })
  createdAt: Date;

  @WorkspaceField({
    standardId: BASE_OBJECT_STANDARD_FIELD_IDS.updatedAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Update date',
    description: 'Update date',
    icon: 'IconCalendar',
    defaultValue: 'now',
  })
  @WorkspaceIsSystem()
  updatedAt: Date;
}
