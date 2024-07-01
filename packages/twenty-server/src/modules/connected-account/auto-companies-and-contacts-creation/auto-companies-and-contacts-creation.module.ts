import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateCompanyAndContactService } from 'src/modules/connected-account/auto-companies-and-contacts-creation/services/create-company-and-contact.service';
import { CreateCompanyModule } from 'src/modules/connected-account/auto-companies-and-contacts-creation/create-company/create-company.module';
import { CreateContactModule } from 'src/modules/connected-account/auto-companies-and-contacts-creation/create-contact/create-contact.module';
import { ObjectMetadataRepositoryModule } from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import { CalendarEventParticipantModule } from 'src/modules/calendar/services/calendar-event-participant/calendar-event-participant.module';
import { FeatureFlagEntity } from 'src/engine/core-modules/feature-flag/feature-flag.entity';
import { MessagingCommonModule } from 'src/modules/messaging/common/messaging-common.module';
import { AutoCompaniesAndContactsCreationMessageChannelListener } from 'src/modules/connected-account/auto-companies-and-contacts-creation/listeners/auto-companies-and-contacts-creation-message-channel.listener';

@Module({
  imports: [
    CreateContactModule,
    CreateCompanyModule,
    ObjectMetadataRepositoryModule.forFeature([
      PersonWorkspaceEntity,
      WorkspaceMemberWorkspaceEntity,
    ]),
    MessagingCommonModule,
    WorkspaceDataSourceModule,
    CalendarEventParticipantModule,
    TypeOrmModule.forFeature([FeatureFlagEntity], 'core'),
  ],
  providers: [
    CreateCompanyAndContactService,
    AutoCompaniesAndContactsCreationMessageChannelListener,
  ],
  exports: [CreateCompanyAndContactService],
})
export class AutoCompaniesAndContactsCreationModule {}
