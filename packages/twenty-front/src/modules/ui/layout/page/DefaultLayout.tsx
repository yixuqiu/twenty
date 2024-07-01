import { Outlet } from 'react-router-dom';
import { css, Global, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { AuthModal } from '@/auth/components/Modal';
import { CommandMenu } from '@/command-menu/components/CommandMenu';
import { AppErrorBoundary } from '@/error-handler/components/AppErrorBoundary';
import { KeyboardShortcutMenu } from '@/keyboard-shortcut-menu/components/KeyboardShortcutMenu';
import { AppNavigationDrawer } from '@/navigation/components/AppNavigationDrawer';
import { MobileNavigationBar } from '@/navigation/components/MobileNavigationBar';
import { useIsSettingsPage } from '@/navigation/hooks/useIsSettingsPage';
import { OBJECT_SETTINGS_WIDTH } from '@/settings/data-model/constants/ObjectSettings';
import { SignInBackgroundMockPage } from '@/sign-in-background-mock/components/SignInBackgroundMockPage';
import { useShowAuthModal } from '@/ui/layout/hooks/useShowAuthModal';
import { DESKTOP_NAV_DRAWER_WIDTHS } from '@/ui/navigation/navigation-drawer/constants/DesktopNavDrawerWidths';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import { useScreenSize } from '@/ui/utilities/screen-size/hooks/useScreenSize';

const StyledLayout = styled.div`
  background: ${({ theme }) => theme.background.noisy};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  scrollbar-color: ${({ theme }) => theme.border.color.medium};
  scrollbar-width: 4px;
  width: 100%;

  *::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  *::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: ${({ theme }) => theme.border.radius.sm};
  }
`;

const StyledPageContainer = styled(motion.div)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  min-height: 0;
`;

const StyledAppNavigationDrawer = styled(AppNavigationDrawer)`
  flex-shrink: 0;
`;

const StyledMainContainer = styled.div`
  display: flex;
  flex: 0 1 100%;
  overflow: hidden;
`;

export const DefaultLayout = () => {
  const isMobile = useIsMobile();
  const isSettingsPage = useIsSettingsPage();
  const theme = useTheme();
  const windowsWidth = useScreenSize().width;
  const showAuthModal = useShowAuthModal();

  return (
    <>
      <Global
        styles={css`
          body {
            background: ${theme.background.tertiary};
          }
        `}
      />
      <StyledLayout>
        <CommandMenu />
        <KeyboardShortcutMenu />

        <StyledPageContainer
          animate={{
            marginLeft:
              isSettingsPage && !isMobile
                ? (windowsWidth -
                    (OBJECT_SETTINGS_WIDTH +
                      DESKTOP_NAV_DRAWER_WIDTHS.menu +
                      64)) /
                  2
                : 0,
          }}
          transition={{
            duration: theme.animation.duration.normal,
          }}
        >
          <StyledAppNavigationDrawer />
          <StyledMainContainer>
            {showAuthModal ? (
              <>
                <SignInBackgroundMockPage />
                <AnimatePresence mode="wait">
                  <LayoutGroup>
                    <AuthModal>
                      <Outlet />
                    </AuthModal>
                  </LayoutGroup>
                </AnimatePresence>
              </>
            ) : (
              <AppErrorBoundary>
                <Outlet />
              </AppErrorBoundary>
            )}
          </StyledMainContainer>
        </StyledPageContainer>
        {isMobile && <MobileNavigationBar />}
      </StyledLayout>
    </>
  );
};
