import { ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { expect } from '@storybook/test';
import { act, renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { iconsState } from 'twenty-ui';

import { useAuth } from '@/auth/hooks/useAuth';
import { authProvidersState } from '@/client-config/states/authProvidersState';
import { billingState } from '@/client-config/states/billingState';
import { isDebugModeState } from '@/client-config/states/isDebugModeState';
import { isSignInPrefilledState } from '@/client-config/states/isSignInPrefilledState';
import { supportChatState } from '@/client-config/states/supportChatState';
import { telemetryState } from '@/client-config/states/telemetryState';

import { email, mocks, password, results, token } from '../__mocks__/useAuth';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <RecoilRoot>{children}</RecoilRoot>
  </MockedProvider>
);

const renderHooks = () => {
  const { result } = renderHook(
    () => {
      return useAuth();
    },
    {
      wrapper: Wrapper,
    },
  );
  return { result };
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return challenge object', async () => {
    const { result } = renderHooks();

    await act(async () => {
      expect(await result.current.challenge(email, password)).toStrictEqual(
        results.challenge,
      );
    });

    expect(mocks[0].result).toHaveBeenCalled();
  });

  it('should verify user', async () => {
    const { result } = renderHooks();

    await act(async () => {
      await result.current.verify(token);
    });

    expect(mocks[1].result).toHaveBeenCalled();
  });

  it('should handle credential sign-in', async () => {
    const { result } = renderHooks();

    await act(async () => {
      await result.current.signInWithCredentials(email, password);
    });

    expect(mocks[0].result).toHaveBeenCalled();
    expect(mocks[1].result).toHaveBeenCalled();
  });

  it('should handle sign-out', async () => {
    const { result } = renderHook(
      () => {
        const client = useApolloClient();
        const icons = useRecoilValue(iconsState);
        const authProviders = useRecoilValue(authProvidersState);
        const billing = useRecoilValue(billingState);
        const isSignInPrefilled = useRecoilValue(isSignInPrefilledState);
        const supportChat = useRecoilValue(supportChatState);
        const telemetry = useRecoilValue(telemetryState);
        const isDebugMode = useRecoilValue(isDebugModeState);
        return {
          ...useAuth(),
          client,
          state: {
            icons,
            authProviders,
            billing,
            isSignInPrefilled,
            supportChat,
            telemetry,
            isDebugMode,
          },
        };
      },
      {
        wrapper: Wrapper,
      },
    );

    const { signOut, client } = result.current;

    await act(async () => {
      await signOut();
    });

    expect(sessionStorage.length).toBe(0);
    expect(client.cache.extract()).toEqual({});

    const { state } = result.current;

    expect(state.icons).toEqual({});
    expect(state.authProviders).toEqual({
      google: false,
      microsoft: false,
      magicLink: false,
      password: false,
    });
    expect(state.billing).toBeNull();
    expect(state.isSignInPrefilled).toBe(false);
    expect(state.supportChat).toEqual({
      supportDriver: 'none',
      supportFrontChatId: null,
    });
    expect(state.telemetry).toEqual({
      enabled: true,
    });
    expect(state.isDebugMode).toBe(false);
  });

  it('should handle credential sign-up', async () => {
    const { result } = renderHooks();

    await act(async () => {
      const res = await result.current.signUpWithCredentials(email, password);
      expect(res).toHaveProperty('user');
      expect(res).toHaveProperty('workspaceMember');
      expect(res).toHaveProperty('workspace');
    });

    expect(mocks[2].result).toHaveBeenCalled();
  });
});
