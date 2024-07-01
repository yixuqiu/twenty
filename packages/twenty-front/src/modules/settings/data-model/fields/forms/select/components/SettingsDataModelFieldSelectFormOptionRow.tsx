import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  ColorSample,
  IconCheck,
  IconDotsVertical,
  IconGripVertical,
  IconTrash,
  IconX,
  MAIN_COLOR_NAMES,
} from 'twenty-ui';
import { v4 } from 'uuid';

import { FieldMetadataItemOption } from '@/object-metadata/types/FieldMetadataItem';
import { getOptionValueFromLabel } from '@/settings/data-model/fields/forms/select/utils/getOptionValueFromLabel';
import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { TextInput } from '@/ui/input/components/TextInput';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';
import { MenuItemSelectColor } from '@/ui/navigation/menu-item/components/MenuItemSelectColor';

type SettingsDataModelFieldSelectFormOptionRowProps = {
  className?: string;
  isDefault?: boolean;
  onChange: (value: FieldMetadataItemOption) => void;
  onRemove?: () => void;
  onSetAsDefault?: () => void;
  onRemoveAsDefault?: () => void;
  option: FieldMetadataItemOption;
  focused?: boolean;
};

const StyledRow = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(1.5)} 0;
`;

const StyledColorSample = styled(ColorSample)`
  cursor: pointer;
  margin-left: 9px;
  margin-right: 14px;
`;

const StyledOptionInput = styled(TextInput)`
  flex: 1 0 auto;
  margin-right: ${({ theme }) => theme.spacing(2)};

  & input {
    height: ${({ theme }) => theme.spacing(6)};
  }
`;

export const SettingsDataModelFieldSelectFormOptionRow = ({
  className,
  isDefault,
  onChange,
  onRemove,
  onSetAsDefault,
  onRemoveAsDefault,
  option,
  focused,
}: SettingsDataModelFieldSelectFormOptionRowProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = useTheme();

  const dropdownIds = useMemo(() => {
    const baseScopeId = `select-field-option-row-${v4()}`;
    return {
      color: `${baseScopeId}-color`,
      actions: `${baseScopeId}-actions`,
    };
  }, []);

  const { closeDropdown: closeColorDropdown } = useDropdown(dropdownIds.color);
  const { closeDropdown: closeActionsDropdown } = useDropdown(
    dropdownIds.actions,
  );

  useEffect(() => {
    if (focused === true) {
      inputRef.current?.focus();
    }
  }, [focused]);

  return (
    <StyledRow className={className}>
      <IconGripVertical
        size={theme.icon.size.md}
        stroke={theme.icon.stroke.sm}
        color={theme.font.color.extraLight}
      />
      <Dropdown
        dropdownId={dropdownIds.color}
        dropdownPlacement="bottom-start"
        dropdownHotkeyScope={{
          scope: dropdownIds.color,
        }}
        clickableComponent={<StyledColorSample colorName={option.color} />}
        dropdownComponents={
          <DropdownMenu>
            <DropdownMenuItemsContainer>
              {MAIN_COLOR_NAMES.map((colorName) => (
                <MenuItemSelectColor
                  key={colorName}
                  onClick={() => {
                    onChange({ ...option, color: colorName });
                    closeColorDropdown();
                  }}
                  color={colorName}
                  selected={colorName === option.color}
                />
              ))}
            </DropdownMenuItemsContainer>
          </DropdownMenu>
        }
      />
      <StyledOptionInput
        ref={inputRef}
        disableHotkeys
        value={option.label}
        onChange={(label) =>
          onChange({
            ...option,
            label,
            value: getOptionValueFromLabel(label),
          })
        }
        RightIcon={isDefault ? IconCheck : undefined}
      />
      <Dropdown
        dropdownId={dropdownIds.actions}
        dropdownPlacement="right-start"
        dropdownHotkeyScope={{
          scope: dropdownIds.actions,
        }}
        clickableComponent={<LightIconButton Icon={IconDotsVertical} />}
        dropdownComponents={
          <DropdownMenu>
            <DropdownMenuItemsContainer>
              {isDefault ? (
                <MenuItem
                  LeftIcon={IconX}
                  text="Remove as default"
                  onClick={() => {
                    onRemoveAsDefault?.();
                    closeActionsDropdown();
                  }}
                />
              ) : (
                <MenuItem
                  LeftIcon={IconCheck}
                  text="Set as default"
                  onClick={() => {
                    onSetAsDefault?.();
                    closeActionsDropdown();
                  }}
                />
              )}
              {!!onRemove && !isDefault && (
                <MenuItem
                  accent="danger"
                  LeftIcon={IconTrash}
                  text="Remove option"
                  onClick={() => {
                    onRemove();
                    closeActionsDropdown();
                  }}
                />
              )}
            </DropdownMenuItemsContainer>
          </DropdownMenu>
        }
      />
    </StyledRow>
  );
};
