import { Module } from '@nestjs/common';

import { ForeignTableService } from 'src/engine/metadata-modules/remote-server/remote-table/foreign-table/foreign-table.service';
import { WorkspaceCacheVersionModule } from 'src/engine/metadata-modules/workspace-cache-version/workspace-cache-version.module';
import { WorkspaceMigrationModule } from 'src/engine/metadata-modules/workspace-migration/workspace-migration.module';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import { WorkspaceMigrationRunnerModule } from 'src/engine/workspace-manager/workspace-migration-runner/workspace-migration-runner.module';

@Module({
  imports: [
    WorkspaceMigrationModule,
    WorkspaceMigrationRunnerModule,
    WorkspaceDataSourceModule,
    WorkspaceCacheVersionModule,
  ],
  providers: [ForeignTableService],
  exports: [ForeignTableService],
})
export class ForeignTableModule {}
