import styled from '@emotion/styled';

import { Card } from '@/ui/layout/card/components/Card';

type EventCardProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

const StyledCardContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 400px;
  padding: ${({ theme }) => theme.spacing(2)} 0px
    ${({ theme }) => theme.spacing(1)} 0px;
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};

  display: flex;
  padding: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: center;
  align-self: stretch;
`;

export const EventCard = ({ children, isOpen }: EventCardProps) => {
  return (
    isOpen && (
      <StyledCardContainer>
        <StyledCard fullWidth>{children}</StyledCard>
      </StyledCardContainer>
    )
  );
};
