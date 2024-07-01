import { createState } from 'twenty-ui';

import { User } from '~/generated/graphql';

export type CurrentUser = Pick<
  User,
  'id' | 'email' | 'supportUserHash' | 'canImpersonate' | 'onboardingStatus'
>;

export const currentUserState = createState<CurrentUser | null>({
  key: 'currentUserState',
  defaultValue: null,
});
