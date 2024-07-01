import styled from '@emotion/styled';
import { IconComponent, Tag, ThemeColor } from 'twenty-ui';

import { Checkbox } from '@/ui/input/components/Checkbox';
import { MenuItemLeftContent } from '@/ui/navigation/menu-item/internals/components/MenuItemLeftContent';

import { StyledMenuItemBase } from '../internals/components/StyledMenuItemBase';

const StyledLeftContentWithCheckboxContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(2)};
`;

type MenuItemMultiSelectProps = {
  color?: ThemeColor;
  LeftIcon?: IconComponent;
  selected: boolean;
  text: string;
  className: string;
  onSelectChange?: (selected: boolean) => void;
};

export const MenuItemMultiSelect = ({
  color,
  LeftIcon,
  text,
  selected,
  className,
  onSelectChange,
}: MenuItemMultiSelectProps) => {
  const handleOnClick = () => {
    onSelectChange?.(!selected);
  };

  return (
    <StyledMenuItemBase className={className} onClick={handleOnClick}>
      <StyledLeftContentWithCheckboxContainer>
        <Checkbox checked={selected} />
        {color ? (
          <Tag color={color} text={text} Icon={LeftIcon} />
        ) : (
          <MenuItemLeftContent LeftIcon={LeftIcon} text={text} />
        )}
      </StyledLeftContentWithCheckboxContainer>
    </StyledMenuItemBase>
  );
};
