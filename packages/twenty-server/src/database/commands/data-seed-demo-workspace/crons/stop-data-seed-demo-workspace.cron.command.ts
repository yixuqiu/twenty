import { Command, CommandRunner } from 'nest-commander';

import { dataSeedDemoWorkspaceCronPattern } from 'src/database/commands/data-seed-demo-workspace/crons/data-seed-demo-workspace-cron-pattern';
import { DataSeedDemoWorkspaceJob } from 'src/database/commands/data-seed-demo-workspace/jobs/data-seed-demo-workspace.job';
import { InjectMessageQueue } from 'src/engine/integrations/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/integrations/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/integrations/message-queue/services/message-queue.service';

@Command({
  name: 'workspace-seed-demo:cron:stop',
  description: 'Stop cron to seed workspace with demo data.',
})
export class StopDataSeedDemoWorkspaceCronCommand extends CommandRunner {
  constructor(
    @InjectMessageQueue(MessageQueue.cronQueue)
    private readonly messageQueueService: MessageQueueService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.messageQueueService.removeCron(
      DataSeedDemoWorkspaceJob.name,
      dataSeedDemoWorkspaceCronPattern,
    );
  }
}
