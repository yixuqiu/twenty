import * as React from 'react';
import styled from '@emotion/styled';
import { IconCheck, IconMinus } from 'twenty-ui';
import { v4 } from 'uuid';

export enum CheckboxVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export enum CheckboxShape {
  Squared = 'squared',
  Rounded = 'rounded',
}

export enum CheckboxSize {
  Large = 'large',
  Small = 'small',
}

type CheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  hoverable?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (value: boolean) => void;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  shape?: CheckboxShape;
  className?: string;
  disabled?: boolean;
};

type InputProps = {
  checkboxSize: CheckboxSize;
  variant: CheckboxVariant;
  indeterminate?: boolean;
  hoverable?: boolean;
  shape?: CheckboxShape;
  isChecked?: boolean;
  disabled?: boolean;
};

const StyledInputContainer = styled.div<InputProps>`
  --size: ${({ checkboxSize }) =>
    checkboxSize === CheckboxSize.Large ? '32px' : '24px'};
  align-items: center;
  border-radius: ${({ theme, shape }) =>
    shape === CheckboxShape.Rounded
      ? theme.border.radius.rounded
      : theme.border.radius.sm};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  position: relative;
  ${({ hoverable, isChecked, theme, indeterminate, disabled }) => {
    if (!hoverable || disabled === true) return '';
    return `&:hover{
      background-color: ${
        indeterminate || isChecked
          ? theme.color.blue10
          : theme.background.transparent.light
      };
    }}
  }`;
  }}
`;

const StyledInput = styled.input<InputProps>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin: 0;
  opacity: 0;
  position: absolute;
  z-index: 10;
  & + label {
    --size: ${({ checkboxSize }) =>
      checkboxSize === CheckboxSize.Large ? '18px' : '12px'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    height: calc(var(--size) + 2px);
    padding: 0;
    position: relative;
    width: calc(var(--size) + 2px);
  }

  & + label:before {
    --size: ${({ checkboxSize }) =>
      checkboxSize === CheckboxSize.Large ? '18px' : '12px'};
    background: ${({ theme, indeterminate, isChecked }) =>
      indeterminate || isChecked ? theme.color.blue : 'transparent'};
    border-color: ${({
      theme,
      indeterminate,
      isChecked,
      variant,
      disabled,
    }) => {
      switch (true) {
        case disabled:
          return theme.background.transparent.medium;
        case indeterminate || isChecked:
          return theme.color.blue;
        case variant === CheckboxVariant.Primary:
          return theme.border.color.inverted;
        case variant === CheckboxVariant.Tertiary:
          return theme.border.color.medium;
        default:
          return theme.border.color.secondaryInverted;
      }
    }};
    border-radius: ${({ theme, shape }) =>
      shape === CheckboxShape.Rounded
        ? theme.border.radius.rounded
        : theme.border.radius.sm};
    border-style: solid;
    border-width: ${({ variant, checkboxSize }) =>
      checkboxSize === CheckboxSize.Large ||
      variant === CheckboxVariant.Tertiary
        ? '1.43px'
        : '1px'};
    content: '';
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    display: inline-block;
    height: var(--size);
    width: var(--size);
  }

  & + label > svg {
    --padding: ${({ checkboxSize }) =>
      checkboxSize === CheckboxSize.Large ? '2px' : '1px'};
    --size: ${({ checkboxSize }) =>
      checkboxSize === CheckboxSize.Large ? '16px' : '12px'};
    height: var(--size);
    left: var(--padding);
    position: absolute;
    stroke: ${({ theme }) => theme.grayScale.gray0};
    top: var(--padding);
    width: var(--size);
  }
`;

export const Checkbox = ({
  checked,
  onChange,
  onCheckedChange,
  indeterminate,
  variant = CheckboxVariant.Primary,
  size = CheckboxSize.Small,
  shape = CheckboxShape.Squared,
  hoverable = false,
  className,
  disabled = false,
}: CheckboxProps) => {
  const [isInternalChecked, setIsInternalChecked] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setIsInternalChecked(checked ?? false);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.target.checked);
    setIsInternalChecked(event.target.checked ?? false);
  };

  const checkboxId = 'checkbox' + v4();

  return (
    <StyledInputContainer
      checkboxSize={size}
      variant={variant}
      shape={shape}
      isChecked={isInternalChecked}
      hoverable={hoverable}
      indeterminate={indeterminate}
      className={className}
      disabled={disabled}
    >
      <StyledInput
        autoComplete="off"
        type="checkbox"
        id={checkboxId}
        name="styled-checkbox"
        data-testid="input-checkbox"
        checked={isInternalChecked}
        indeterminate={indeterminate}
        variant={variant}
        checkboxSize={size}
        shape={shape}
        isChecked={isInternalChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <label htmlFor={checkboxId}>
        {indeterminate ? (
          <IconMinus />
        ) : isInternalChecked ? (
          <IconCheck />
        ) : (
          <></>
        )}
      </label>
    </StyledInputContainer>
  );
};
