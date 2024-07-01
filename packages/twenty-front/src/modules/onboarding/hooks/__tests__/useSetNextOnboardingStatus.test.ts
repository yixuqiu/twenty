import { act, renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';

import { currentUserState } from '@/auth/states/currentUserState';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { useSetNextOnboardingStatus } from '@/onboarding/hooks/useSetNextOnboardingStatus';
import { OnboardingStatus, SubscriptionStatus } from '~/generated/graphql';
import {
  mockDefaultWorkspace,
  mockedUserData,
} from '~/testing/mock-data/users';

const renderHooks = (
  onboardingStatus: OnboardingStatus,
  withCurrentBillingSubscription: boolean,
  withOneWorkspaceMember = true,
) => {
  const { result } = renderHook(
    () => {
      const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
      const setCurrentWorkspace = useSetRecoilState(currentWorkspaceState);
      const setNextOnboardingStatus = useSetNextOnboardingStatus();
      return {
        currentUser,
        setCurrentUser,
        setCurrentWorkspace,
        setNextOnboardingStatus,
      };
    },
    {
      wrapper: RecoilRoot,
    },
  );
  act(() => {
    result.current.setCurrentUser({ ...mockedUserData, onboardingStatus });
    result.current.setCurrentWorkspace({
      ...mockDefaultWorkspace,
      currentBillingSubscription: withCurrentBillingSubscription
        ? { id: v4(), status: SubscriptionStatus.Active }
        : undefined,
      workspaceMembersCount: withOneWorkspaceMember ? 1 : 2,
    });
  });
  act(() => {
    result.current.setNextOnboardingStatus();
  });
  return result.current.currentUser?.onboardingStatus;
};

describe('useSetNextOnboardingStatus', () => {
  it('should set next onboarding status for ProfileCreation', () => {
    const nextOnboardingStatus = renderHooks(
      OnboardingStatus.ProfileCreation,
      false,
      true,
    );
    expect(nextOnboardingStatus).toEqual(OnboardingStatus.SyncEmail);
  });

  it('should set next onboarding status for SyncEmail', () => {
    const nextOnboardingStatus = renderHooks(
      OnboardingStatus.SyncEmail,
      false,
      true,
    );
    expect(nextOnboardingStatus).toEqual(OnboardingStatus.InviteTeam);
  });

  it('should skip invite when more than 1 workspaceMember exist', () => {
    const nextOnboardingStatus = renderHooks(
      OnboardingStatus.SyncEmail,
      true,
      false,
    );
    expect(nextOnboardingStatus).toEqual(OnboardingStatus.Completed);
  });

  it('should set next onboarding status for Completed', () => {
    const nextOnboardingStatus = renderHooks(
      OnboardingStatus.InviteTeam,
      true,
      true,
    );
    expect(nextOnboardingStatus).toEqual(OnboardingStatus.Completed);
  });
});
