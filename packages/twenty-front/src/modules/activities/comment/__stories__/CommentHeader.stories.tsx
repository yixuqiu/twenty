import { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { useSetRecoilState } from 'recoil';

import { ActivityActionBar } from '@/activities/right-drawer/components/ActivityActionBar';
import { viewableRecordIdState } from '@/object-record/record-right-drawer/states/viewableRecordIdState';
import { ComponentWithRouterDecorator } from '~/testing/decorators/ComponentWithRouterDecorator';
import { avatarUrl } from '~/testing/mock-data/users';

import { CommentHeader } from '../CommentHeader';

import { mockComment, mockCommentWithLongValues } from './mock-comment';

const CommentHeaderSetterEffect = () => {
  const setViewableRecord = useSetRecoilState(viewableRecordIdState);

  useEffect(() => {
    setViewableRecord('test-id');
  }, [setViewableRecord]);

  return null;
};

const meta: Meta<typeof CommentHeader> = {
  title: 'Modules/Activity/Comment/CommentHeader',
  component: CommentHeader,
  decorators: [
    (Story) => (
      <>
        <CommentHeaderSetterEffect />
        <Story />
      </>
    ),
    ComponentWithRouterDecorator,
  ],
  argTypes: {
    actionBar: {
      type: 'boolean',
      mapping: {
        true: <ActivityActionBar />,
        false: undefined,
      },
    },
  },
  args: { comment: mockComment },
};

export default meta;
type Story = StoryObj<typeof CommentHeader>;

export const Default: Story = {};

export const FewHoursAgo: Story = {
  args: {
    comment: {
      ...mockComment,
      createdAt: DateTime.now().minus({ hours: 2 }).toISO() ?? '',
    },
  },
};

export const FewDaysAgo: Story = {
  args: {
    comment: {
      ...mockComment,
      createdAt: DateTime.now().minus({ days: 2 }).toISO() ?? '',
    },
  },
};

export const FewMonthsAgo: Story = {
  args: {
    comment: {
      ...mockComment,
      createdAt: DateTime.now().minus({ months: 2 }).toISO() ?? '',
    },
  },
};

export const FewYearsAgo: Story = {
  args: {
    comment: {
      ...mockComment,
      createdAt: DateTime.now().minus({ years: 2 }).toISO() ?? '',
    },
  },
};

export const WithAvatar: Story = {
  args: {
    comment: {
      ...mockComment,
      author: {
        ...mockComment.author,
        avatarUrl,
      },
    },
  },
};

export const WithLongUserName: Story = {
  args: { comment: mockCommentWithLongValues },
};

export const WithActionBar: Story = {
  args: { actionBar: true },
};
