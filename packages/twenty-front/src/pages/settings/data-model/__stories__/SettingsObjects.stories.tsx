import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';

import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { sleep } from '~/utils/sleep';

import { SettingsObjects } from '../SettingsObjects';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Settings/DataModel/SettingsObjects',
  component: SettingsObjects,
  decorators: [PageDecorator],
  args: { routePath: '/settings/objects' },
  parameters: {
    msw: graphqlMocks,
  },
};

export default meta;

export type Story = StoryObj<typeof SettingsObjects>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await sleep(1000);

    await canvas.getByRole('heading', {
      level: 2,
      name: 'Objects',
    });
  },
};
