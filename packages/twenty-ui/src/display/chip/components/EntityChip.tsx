import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { isNonEmptyString } from '@sniptt/guards';

import { Avatar } from '@ui/display/avatar/components/Avatar';
import { AvatarType } from '@ui/display/avatar/types/AvatarType';
import { Chip, ChipVariant } from '@ui/display/chip/components/Chip';
import { IconComponent } from '@ui/display/icon/types/IconComponent';
import { Nullable } from '@ui/utilities/types/Nullable';

export type EntityChipProps = {
  linkToEntity?: string;
  entityId: string;
  name: string;
  avatarUrl?: string;
  avatarType?: Nullable<AvatarType>;
  variant?: EntityChipVariant;
  LeftIcon?: IconComponent;
  className?: string;
};

export enum EntityChipVariant {
  Regular = 'regular',
  Transparent = 'transparent',
}

export const EntityChip = ({
  linkToEntity,
  entityId,
  name,
  avatarUrl,
  avatarType = 'rounded',
  variant = EntityChipVariant.Regular,
  LeftIcon,
  className,
}: EntityChipProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isNonEmptyString(linkToEntity)) {
      event.stopPropagation();
      navigate(linkToEntity);
    }
  };

  return (
    <Chip
      label={name}
      variant={
        linkToEntity
          ? variant === EntityChipVariant.Regular
            ? ChipVariant.Highlighted
            : ChipVariant.Regular
          : ChipVariant.Transparent
      }
      leftComponent={
        LeftIcon ? (
          <LeftIcon size={theme.icon.size.md} stroke={theme.icon.stroke.sm} />
        ) : (
          <Avatar
            avatarUrl={avatarUrl}
            entityId={entityId}
            placeholder={name}
            size="sm"
            type={avatarType}
          />
        )
      }
      clickable={!!linkToEntity}
      onClick={handleLinkClick}
      className={className}
    />
  );
};
