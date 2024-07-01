import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { sleep } from '~/utils/sleep';

import { SettingsObjectDetail } from '../SettingsObjectDetail';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Settings/DataModel/SettingsObjectDetail',
  component: SettingsObjectDetail,
  decorators: [PageDecorator],
  args: {
    routePath: '/settings/objects/:objectSlug',
    routeParams: { ':objectSlug': 'companies' },
  },
  parameters: {
    msw: graphqlMocks,
  },
};

export default meta;

export type Story = StoryObj<typeof SettingsObjectDetail>;

export const StandardObject: Story = {
  play: async () => {
    await sleep(100);
  },
};

export const CustomObject: Story = {
  args: {
    routeParams: { ':objectSlug': 'workspaces' },
  },
};

export const ObjectDropdownMenu: Story = {
  play: async ({ canvasElement }) => {
    await sleep(100);

    const canvas = within(canvasElement);
    const objectSummaryVerticalDotsIconButton = await canvas.findByRole(
      'button',
      {
        name: 'Object Options',
      },
    );

    await userEvent.click(objectSummaryVerticalDotsIconButton);

    await canvas.findByText('Edit');
    await canvas.findByText('Deactivate');
  },
};

export const FieldDropdownMenu: Story = {
  play: async ({ canvasElement }) => {
    await sleep(100);

    const canvas = within(canvasElement);
    const [fieldVerticalDotsIconButton] = await canvas.findAllByRole('button', {
      name: 'Active Field Options',
    });

    await userEvent.click(fieldVerticalDotsIconButton);

    await canvas.findByText('View');
    await canvas.findByText('Deactivate');
  },
};
