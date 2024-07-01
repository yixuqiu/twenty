import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  IconBookmark,
  IconBookmarkPlus,
  IconComponent,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from 'twenty-ui';

import { LinkDisplay } from '@/ui/field/display/components/LinkDisplay';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';

type LinksFieldMenuItemProps = {
  dropdownId: string;
  isPrimary?: boolean;
  label: string;
  onEdit?: () => void;
  onSetAsPrimary?: () => void;
  onDelete?: () => void;
  url: string;
};

const StyledIconBookmark = styled(IconBookmark)`
  color: ${({ theme }) => theme.font.color.light};
  height: ${({ theme }) => theme.icon.size.sm}px;
  width: ${({ theme }) => theme.icon.size.sm}px;
`;

export const LinksFieldMenuItem = ({
  dropdownId,
  isPrimary,
  label,
  onEdit,
  onSetAsPrimary,
  onDelete,
  url,
}: LinksFieldMenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDropdownOpen, closeDropdown } = useDropdown(dropdownId);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Make sure dropdown closes on unmount.
  useEffect(() => {
    if (isDropdownOpen) {
      return () => closeDropdown();
    }
  }, [closeDropdown, isDropdownOpen]);

  return (
    <MenuItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      text={<LinkDisplay value={{ label, url }} />}
      isIconDisplayedOnHoverOnly={!isPrimary && !isDropdownOpen}
      iconButtons={[
        {
          Wrapper: isHovered
            ? ({ iconButton }) => (
                <Dropdown
                  dropdownId={dropdownId}
                  dropdownHotkeyScope={{
                    scope: dropdownId,
                  }}
                  dropdownPlacement="right-start"
                  dropdownStrategy="fixed"
                  disableBlur
                  clickableComponent={iconButton}
                  dropdownComponents={
                    <DropdownMenuItemsContainer>
                      {!isPrimary && (
                        <MenuItem
                          LeftIcon={IconBookmarkPlus}
                          text="Set as Primary"
                          onClick={onSetAsPrimary}
                        />
                      )}
                      <MenuItem
                        LeftIcon={IconPencil}
                        text="Edit"
                        onClick={onEdit}
                      />
                      {!isPrimary && (
                        <MenuItem
                          accent="danger"
                          LeftIcon={IconTrash}
                          text="Delete"
                          onClick={onDelete}
                        />
                      )}
                    </DropdownMenuItemsContainer>
                  }
                />
              )
            : undefined,
          Icon:
            isPrimary && !isHovered
              ? (StyledIconBookmark as IconComponent)
              : IconDotsVertical,
          accent: 'tertiary',
          onClick: isHovered ? () => {} : undefined,
        },
      ]}
    />
  );
};
