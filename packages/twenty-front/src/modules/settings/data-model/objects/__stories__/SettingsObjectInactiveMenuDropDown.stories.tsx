import { Decorator, Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ComponentDecorator } from 'twenty-ui';

import { SettingsObjectInactiveMenuDropDown } from '../SettingsObjectInactiveMenuDropDown';

const handleActivateMockFunction = fn();
const handleDeleteMockFunction = fn();

const ClearMocksDecorator: Decorator = (Story, context) => {
  if (context.parameters.clearMocks === true) {
    handleActivateMockFunction.mockClear();
    handleDeleteMockFunction.mockClear();
  }
  return <Story />;
};

const meta: Meta<typeof SettingsObjectInactiveMenuDropDown> = {
  title: 'Modules/Settings/DataModel/SettingsObjectInactiveMenuDropDown',
  component: SettingsObjectInactiveMenuDropDown,
  args: {
    scopeKey: 'settings-object-inactive-menu-dropdown',
    onActivate: handleActivateMockFunction,
    onDelete: handleDeleteMockFunction,
  },
  decorators: [ComponentDecorator, ClearMocksDecorator],
  parameters: {
    clearMocks: true,
  },
};

export default meta;
type Story = StoryObj<typeof SettingsObjectInactiveMenuDropDown>;

export const Default: Story = {};

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownButton = await canvas.getByRole('button');

    await userEvent.click(dropdownButton);
  },
};

export const WithActivate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownButton = await canvas.getByRole('button');

    await userEvent.click(dropdownButton);

    await expect(handleActivateMockFunction).toHaveBeenCalledTimes(0);

    const activateMenuItem = await canvas.getByText('Activate');

    await userEvent.click(activateMenuItem);

    await expect(handleActivateMockFunction).toHaveBeenCalledTimes(1);

    await userEvent.click(dropdownButton);
  },
};

export const WithDelete: Story = {
  args: { isCustomObject: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownButton = await canvas.getByRole('button');

    await userEvent.click(dropdownButton);

    await expect(handleDeleteMockFunction).toHaveBeenCalledTimes(0);

    const deleteMenuItem = await canvas.getByText('Delete');

    await userEvent.click(deleteMenuItem);

    await expect(handleDeleteMockFunction).toHaveBeenCalledTimes(1);

    await userEvent.click(dropdownButton);
  },
};
