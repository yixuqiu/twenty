import { Logger } from '@nestjs/common';

import {
  MessageQueueJobData,
  MessageQueueJob,
} from 'src/engine/integrations/message-queue/interfaces/message-queue-job.interface';

import { MessageQueue } from 'src/engine/integrations/message-queue/message-queue.constants';

import { MessageQueueDriver } from './interfaces/message-queue-driver.interface';

export class SyncDriver implements MessageQueueDriver {
  private readonly logger = new Logger(SyncDriver.name);
  private workersMap: {
    [queueName: string]: (job: MessageQueueJob<any>) => Promise<void> | void;
  } = {};

  constructor() {}

  async add<T extends MessageQueueJobData>(
    queueName: MessageQueue,
    jobName: string,
    data: T,
  ): Promise<void> {
    await this.processJob(queueName, { id: '', name: jobName, data });
  }

  async addCron<T extends MessageQueueJobData | undefined>(
    queueName: MessageQueue,
    jobName: string,
    data: T,
  ): Promise<void> {
    this.logger.log(`Running cron job with SyncDriver`);
    await this.processJob(queueName, {
      id: '',
      name: jobName,
      // TODO: Fix this type issue
      data: data as any,
    });
  }

  async removeCron(queueName: MessageQueue) {
    this.logger.log(`Removing '${queueName}' cron job with SyncDriver`);
  }

  work<T extends MessageQueueJobData>(
    queueName: MessageQueue,
    handler: (job: MessageQueueJob<T>) => Promise<void> | void,
  ) {
    this.logger.log(`Registering handler for queue: ${queueName}`);
    this.workersMap[queueName] = handler;
  }

  async processJob<T extends MessageQueueJobData>(
    queueName: string,
    job: MessageQueueJob<T>,
  ) {
    const worker = this.workersMap[queueName];

    if (worker) {
      await worker(job);
    } else {
      this.logger.error(`No handler found for job: ${queueName}`);
    }
  }
}
