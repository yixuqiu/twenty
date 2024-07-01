import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceIsNullable } from 'src/engine/twenty-orm/decorators/workspace-is-nullable.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { API_KEY_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.apiKey,
  namePlural: 'apiKeys',
  labelSingular: 'Api Key',
  labelPlural: 'Api Keys',
  description: 'An api key',
  icon: 'IconRobot',
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class ApiKeyWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: API_KEY_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'ApiKey name',
    icon: 'IconLink',
  })
  name: string;

  @WorkspaceField({
    standardId: API_KEY_STANDARD_FIELD_IDS.expiresAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Expiration date',
    description: 'ApiKey expiration date',
    icon: 'IconCalendar',
  })
  expiresAt: Date;

  @WorkspaceField({
    standardId: API_KEY_STANDARD_FIELD_IDS.revokedAt,
    type: FieldMetadataType.DATE_TIME,
    label: 'Revocation date',
    description: 'ApiKey revocation date',
    icon: 'IconCalendar',
  })
  @WorkspaceIsNullable()
  revokedAt?: Date | null;
}
