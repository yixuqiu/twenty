import { Meta, StoryObj } from '@storybook/react';
import { graphql, HttpResponse } from 'msw';

import { AppPath } from '@/types/AppPath';
import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { mockedWorkspaceMemberData } from '~/testing/mock-data/users';
import { sleep } from '~/utils/sleep';

import { Tasks } from '../Tasks';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Tasks/Default',
  component: Tasks,
  decorators: [PageDecorator],
  args: { routePath: AppPath.TasksPage },
  parameters: {
    msw: {
      handlers: [
        graphql.query('FindOneWorkspaceMember', () => {
          return HttpResponse.json({
            data: {
              workspaceMember: mockedWorkspaceMemberData,
            },
          });
        }),
        graphqlMocks.handlers,
      ],
    },
  },
};

export default meta;

export type Story = StoryObj<typeof Tasks>;

export const Default: Story = {
  play: async () => {
    await sleep(100);
  },
};
