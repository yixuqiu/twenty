import { Meta, StoryObj } from '@storybook/react';
import { ComponentDecorator } from 'twenty-ui';

import { useProgressAnimation } from '@/ui/feedback/progress-bar/hooks/useProgressAnimation';

import { ProgressBar } from '../ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'UI/Feedback/ProgressBar/ProgressBar',
  component: ProgressBar,
  decorators: [ComponentDecorator],
  argTypes: {
    className: { control: false },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 75,
  },
};

export const Animated: Story = {
  argTypes: {
    value: { control: false },
  },
  decorators: [
    (Story) => {
      const { value } = useProgressAnimation({
        autoPlay: true,
        initialValue: 0,
        finalValue: 100,
        options: {
          duration: 10000,
        },
      });

      return <Story args={{ value }} />;
    },
  ],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
