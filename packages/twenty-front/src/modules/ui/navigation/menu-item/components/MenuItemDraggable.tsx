import { IconComponent } from 'twenty-ui';

import { LightIconButtonGroup } from '@/ui/input/button/components/LightIconButtonGroup';

import { MenuItemLeftContent } from '../internals/components/MenuItemLeftContent';
import {
  StyledHoverableMenuItemBase,
  StyledMenuItemBase,
} from '../internals/components/StyledMenuItemBase';
import { MenuItemAccent } from '../types/MenuItemAccent';

import { MenuItemIconButton } from './MenuItem';

export type MenuItemDraggableProps = {
  LeftIcon: IconComponent | undefined;
  accent?: MenuItemAccent;
  iconButtons?: MenuItemIconButton[];
  isTooltipOpen?: boolean;
  onClick?: () => void;
  text: string;
  className?: string;
  isIconDisplayedOnHoverOnly?: boolean;
  showGrip?: boolean;
  isDragDisabled?: boolean;
  isHoverDisabled?: boolean;
};
export const MenuItemDraggable = ({
  LeftIcon,
  accent = 'default',
  iconButtons,
  onClick,
  text,
  isDragDisabled = false,
  className,
  isIconDisplayedOnHoverOnly = true,
  showGrip = false,
  isHoverDisabled = false,
}: MenuItemDraggableProps) => {
  const showIconButtons = Array.isArray(iconButtons) && iconButtons.length > 0;

  if (isHoverDisabled) {
    return (
      <StyledMenuItemBase accent={accent} isHoverBackgroundDisabled>
        <MenuItemLeftContent
          LeftIcon={LeftIcon}
          text={text}
          isDisabled={isDragDisabled}
          showGrip={showGrip}
        />
      </StyledMenuItemBase>
    );
  }

  return (
    <StyledHoverableMenuItemBase
      onClick={onClick}
      accent={accent}
      className={className}
      isIconDisplayedOnHoverOnly={isIconDisplayedOnHoverOnly}
    >
      <MenuItemLeftContent
        LeftIcon={LeftIcon}
        text={text}
        isDisabled={isDragDisabled}
        showGrip={showGrip}
      />
      {showIconButtons && (
        <LightIconButtonGroup
          className="hoverable-buttons"
          iconButtons={iconButtons}
        />
      )}
    </StyledHoverableMenuItemBase>
  );
};
