import { IconArchiveOff, IconDotsVertical, IconTrash } from 'twenty-ui';

import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';
import { FieldMetadataType } from '~/generated-metadata/graphql';

type SettingsObjectFieldInactiveActionDropdownProps = {
  isCustomField?: boolean;
  fieldType?: FieldMetadataType;
  onActivate: () => void;
  onDelete: () => void;
  scopeKey: string;
};

export const SettingsObjectFieldInactiveActionDropdown = ({
  onActivate,
  scopeKey,
  onDelete,
  isCustomField,
  fieldType,
}: SettingsObjectFieldInactiveActionDropdownProps) => {
  const dropdownId = `${scopeKey}-settings-field-disabled-action-dropdown`;

  const { closeDropdown } = useDropdown(dropdownId);

  const handleActivate = () => {
    onActivate();
    closeDropdown();
  };

  const handleDelete = () => {
    onDelete();
    closeDropdown();
  };

  const isDeletable = isCustomField && fieldType !== FieldMetadataType.Address;

  return (
    <Dropdown
      dropdownId={dropdownId}
      clickableComponent={
        <LightIconButton Icon={IconDotsVertical} accent="tertiary" />
      }
      dropdownComponents={
        <DropdownMenu width="160px">
          <DropdownMenuItemsContainer>
            <MenuItem
              text="Activate"
              LeftIcon={IconArchiveOff}
              onClick={handleActivate}
            />
            {isDeletable && (
              <MenuItem
                text="Delete"
                accent="danger"
                LeftIcon={IconTrash}
                onClick={handleDelete}
              />
            )}
          </DropdownMenuItemsContainer>
        </DropdownMenu>
      }
      dropdownHotkeyScope={{
        scope: dropdownId,
      }}
    />
  );
};
