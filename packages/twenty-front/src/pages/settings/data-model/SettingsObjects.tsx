import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  H1Title,
  H2Title,
  IconChevronRight,
  IconPlus,
  IconSettings,
} from 'twenty-ui';

import { useDeleteOneObjectMetadataItem } from '@/object-metadata/hooks/useDeleteOneObjectMetadataItem';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { useUpdateOneObjectMetadataItem } from '@/object-metadata/hooks/useUpdateOneObjectMetadataItem';
import { getObjectSlug } from '@/object-metadata/utils/getObjectSlug';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import {
  SettingsObjectItemTableRow,
  StyledObjectTableRow,
} from '@/settings/data-model/object-details/components/SettingsObjectItemTableRow';
import { SettingsObjectCoverImage } from '@/settings/data-model/objects/SettingsObjectCoverImage';
import { SettingsObjectInactiveMenuDropDown } from '@/settings/data-model/objects/SettingsObjectInactiveMenuDropDown';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { SettingsPath } from '@/types/SettingsPath';
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Table } from '@/ui/layout/table/components/Table';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableSection } from '@/ui/layout/table/components/TableSection';
import { UndecoratedLink } from '@/ui/navigation/link/components/UndecoratedLink';

const StyledIconChevronRight = styled(IconChevronRight)`
  color: ${({ theme }) => theme.font.color.tertiary};
`;

const StyledH1Title = styled(H1Title)`
  margin-bottom: 0;
`;

export const SettingsObjects = () => {
  const theme = useTheme();

  const { activeObjectMetadataItems, inactiveObjectMetadataItems } =
    useFilteredObjectMetadataItems();
  const { deleteOneObjectMetadataItem } = useDeleteOneObjectMetadataItem();
  const { updateOneObjectMetadataItem } = useUpdateOneObjectMetadataItem();

  return (
    <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
      <SettingsPageContainer>
        <SettingsHeaderContainer>
          <StyledH1Title title="Objects" />
          <UndecoratedLink to={getSettingsPagePath(SettingsPath.NewObject)}>
            <Button
              Icon={IconPlus}
              title="Add object"
              accent="blue"
              size="small"
            />
          </UndecoratedLink>
        </SettingsHeaderContainer>
        <div>
          <SettingsObjectCoverImage />
          <Section>
            <H2Title title="Existing objects" />
            <Table>
              <StyledObjectTableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader align="right">Fields</TableHeader>
                <TableHeader align="right">Instances</TableHeader>
                <TableHeader></TableHeader>
              </StyledObjectTableRow>
              {!!activeObjectMetadataItems.length && (
                <TableSection title="Active">
                  {activeObjectMetadataItems.map((activeObjectMetadataItem) => (
                    <SettingsObjectItemTableRow
                      key={activeObjectMetadataItem.namePlural}
                      objectItem={activeObjectMetadataItem}
                      action={
                        <StyledIconChevronRight
                          size={theme.icon.size.md}
                          stroke={theme.icon.stroke.sm}
                        />
                      }
                      to={`/settings/objects/${getObjectSlug(
                        activeObjectMetadataItem,
                      )}`}
                    />
                  ))}
                </TableSection>
              )}
              {!!inactiveObjectMetadataItems.length && (
                <TableSection title="Inactive">
                  {inactiveObjectMetadataItems.map(
                    (inactiveObjectMetadataItem) => (
                      <SettingsObjectItemTableRow
                        key={inactiveObjectMetadataItem.namePlural}
                        objectItem={inactiveObjectMetadataItem}
                        action={
                          <SettingsObjectInactiveMenuDropDown
                            isCustomObject={inactiveObjectMetadataItem.isCustom}
                            scopeKey={inactiveObjectMetadataItem.namePlural}
                            onActivate={() =>
                              updateOneObjectMetadataItem({
                                idToUpdate: inactiveObjectMetadataItem.id,
                                updatePayload: { isActive: true },
                              })
                            }
                            onDelete={() =>
                              deleteOneObjectMetadataItem(
                                inactiveObjectMetadataItem.id,
                              )
                            }
                          />
                        }
                      />
                    ),
                  )}
                </TableSection>
              )}
            </Table>
          </Section>
        </div>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
