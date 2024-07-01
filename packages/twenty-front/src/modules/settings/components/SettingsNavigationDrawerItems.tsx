import { useRecoilValue } from 'recoil';
import {
  IconApps,
  IconAt,
  IconCalendarEvent,
  IconCode,
  IconColorSwatch,
  IconCurrencyDollar,
  IconDoorEnter,
  IconHierarchy2,
  IconMail,
  IconRocket,
  IconSettings,
  IconUserCircle,
  IconUsers,
} from 'twenty-ui';

import { useAuth } from '@/auth/hooks/useAuth';
import { billingState } from '@/client-config/states/billingState';
import { SettingsNavigationDrawerItem } from '@/settings/components/SettingsNavigationDrawerItem';
import { SettingsPath } from '@/types/SettingsPath';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerItemGroup } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItemGroup';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';

export const SettingsNavigationDrawerItems = () => {
  const { signOut } = useAuth();

  const billing = useRecoilValue(billingState);

  return (
    <>
      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle label="User" />
        <SettingsNavigationDrawerItem
          label="Profile"
          path={SettingsPath.ProfilePage}
          Icon={IconUserCircle}
        />
        <SettingsNavigationDrawerItem
          label="Appearance"
          path={SettingsPath.Appearance}
          Icon={IconColorSwatch}
        />

        <NavigationDrawerItemGroup>
          <SettingsNavigationDrawerItem
            label="Accounts"
            path={SettingsPath.Accounts}
            Icon={IconAt}
          />
          <SettingsNavigationDrawerItem
            level={2}
            label="Emails"
            path={SettingsPath.AccountsEmails}
            Icon={IconMail}
            matchSubPages
          />
          <SettingsNavigationDrawerItem
            level={2}
            label="Calendars"
            path={SettingsPath.AccountsCalendars}
            Icon={IconCalendarEvent}
            matchSubPages
          />
        </NavigationDrawerItemGroup>
      </NavigationDrawerSection>

      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle label="Workspace" />
        <SettingsNavigationDrawerItem
          label="General"
          path={SettingsPath.Workspace}
          Icon={IconSettings}
        />
        <SettingsNavigationDrawerItem
          label="Members"
          path={SettingsPath.WorkspaceMembersPage}
          Icon={IconUsers}
        />
        {billing?.isBillingEnabled && (
          <SettingsNavigationDrawerItem
            label="Billing"
            path={SettingsPath.Billing}
            Icon={IconCurrencyDollar}
          />
        )}
        <SettingsNavigationDrawerItem
          label="Data model"
          path={SettingsPath.Objects}
          Icon={IconHierarchy2}
          matchSubPages
        />
        <SettingsNavigationDrawerItem
          label="Developers"
          path={SettingsPath.Developers}
          Icon={IconCode}
        />
        <SettingsNavigationDrawerItem
          label="Integrations"
          path={SettingsPath.Integrations}
          Icon={IconApps}
        />
      </NavigationDrawerSection>

      <NavigationDrawerSection>
        <NavigationDrawerSectionTitle label="Other" />
        <SettingsNavigationDrawerItem
          label="Releases"
          path={SettingsPath.Releases}
          Icon={IconRocket}
        />
        <NavigationDrawerItem
          label="Logout"
          onClick={signOut}
          Icon={IconDoorEnter}
        />
      </NavigationDrawerSection>
    </>
  );
};
