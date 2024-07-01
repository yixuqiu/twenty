import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { Radio } from '@/ui/input/components/Radio';
import { Card } from '@/ui/layout/card/components/Card';
import { CardContent } from '@/ui/layout/card/components/CardContent';

type SettingsAccountsRadioSettingsCardProps<Option extends { value: string }> =
  {
    onChange: (nextValue: Option['value']) => void;
    options: Option[];
    value: Option['value'];
  };

const StyledCardContent = styled(CardContent)`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.background.transparent.lighter};
  }
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const StyledRadio = styled(Radio)`
  margin-left: auto;
`;

export const SettingsAccountsRadioSettingsCard = <
  Option extends {
    cardMedia: ReactNode;
    description: string;
    title: string;
    value: string;
  },
>({
  onChange,
  options,
  value,
}: SettingsAccountsRadioSettingsCardProps<Option>) => (
  <Card rounded>
    {options.map((option, index) => (
      <StyledCardContent
        key={option.value}
        divider={index < options.length - 1}
        onClick={() => onChange(option.value)}
      >
        {option.cardMedia}
        <div>
          <StyledTitle>{option.title}</StyledTitle>
          <StyledDescription>{option.description}</StyledDescription>
        </div>
        <StyledRadio
          value={option.value}
          onCheckedChange={() => onChange(option.value)}
          checked={value === option.value}
        />
      </StyledCardContent>
    ))}
  </Card>
);
