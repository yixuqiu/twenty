import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { BLOCKLIST_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceIsNotAuditLogged } from 'src/engine/twenty-orm/decorators/workspace-is-not-audit-logged.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { WorkspaceJoinColumn } from 'src/engine/twenty-orm/decorators/workspace-join-column.decorator';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.blocklist,
  namePlural: 'blocklists',
  labelSingular: 'Blocklist',
  labelPlural: 'Blocklists',
  description: 'Blocklist',
  icon: 'IconForbid2',
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class BlocklistWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: BLOCKLIST_STANDARD_FIELD_IDS.handle,
    type: FieldMetadataType.TEXT,
    label: 'Handle',
    description: 'Handle',
    icon: 'IconAt',
  })
  handle: string;

  @WorkspaceRelation({
    standardId: BLOCKLIST_STANDARD_FIELD_IDS.workspaceMember,
    type: RelationMetadataType.MANY_TO_ONE,
    label: 'WorkspaceMember',
    description: 'WorkspaceMember',
    icon: 'IconCircleUser',
    inverseSideTarget: () => WorkspaceMemberWorkspaceEntity,
    inverseSideFieldKey: 'blocklist',
  })
  workspaceMember: Relation<WorkspaceMemberWorkspaceEntity>;

  @WorkspaceJoinColumn('workspaceMember')
  workspaceMemberId: string;
}
