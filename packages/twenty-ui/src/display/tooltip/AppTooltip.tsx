import { PlacesType, PositionStrategy, Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';

import { RGBA } from '@ui/theme/constants/Rgba';

export enum TooltipPosition {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom',
}

export enum TooltipDelay {
  noDelay = '0ms',
  shortDelay = '300ms',
  mediumDelay = '500ms',
}

const StyledAppTooltip = styled(Tooltip)`
  backdrop-filter: ${({ theme }) => theme.blur.strong};
  background-color: ${({ theme }) => RGBA(theme.color.gray80, 0.8)};
  border-radius: ${({ theme }) => theme.border.radius.sm};

  box-shadow: ${({ theme }) => theme.boxShadow.light};
  color: ${({ theme }) => theme.grayScale.gray0};

  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.regular};

  max-width: 40%;
  overflow: visible;

  padding: ${({ theme }) => theme.spacing(2)};

  word-break: break-word;

  z-index: ${({ theme }) => theme.lastLayerZIndex};
`;

export type AppTooltipProps = {
  className?: string;
  anchorSelect?: string;
  content?: string;
  children?: React.ReactNode;
  offset?: number;
  noArrow?: boolean;
  isOpen?: boolean;
  place?: PlacesType;
  delay?: TooltipDelay;
  positionStrategy?: PositionStrategy;
  clickable?: boolean;
};

export const AppTooltip = ({
  anchorSelect,
  className,
  content,
  isOpen,
  noArrow,
  offset,
  delay = TooltipDelay.mediumDelay,
  place,
  positionStrategy,
  children,
  clickable,
}: AppTooltipProps) => {
  const delayInMs =
    delay === TooltipDelay.noDelay
      ? 0
      : delay === TooltipDelay.shortDelay
        ? 300
        : 500;

  return (
    <StyledAppTooltip
      {...{
        anchorSelect,
        className,
        content,
        delayShow: delayInMs,
        delayHide: delayInMs,
        isOpen,
        noArrow,
        offset,
        place,
        positionStrategy,
        children,
        clickable,
      }}
    />
  );
};
