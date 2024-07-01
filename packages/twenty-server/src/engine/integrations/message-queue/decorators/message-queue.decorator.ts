import { Inject } from '@nestjs/common';

import { MessageQueue } from 'src/engine/integrations/message-queue/message-queue.constants';
import { getQueueToken } from 'src/engine/integrations/message-queue/utils/get-queue-token.util';

export const InjectMessageQueue = (queueName: MessageQueue) => {
  return Inject(getQueueToken(queueName));
};
