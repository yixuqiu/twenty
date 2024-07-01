import { JSX } from 'react';
import styled from '@emotion/styled';
import { IconComponent } from 'twenty-ui';

import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';

import { PageBody } from './PageBody';
import { PageHeader } from './PageHeader';

type SubMenuTopBarContainerProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
  Icon: IconComponent;
  className?: string;
};

const StyledContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme, isMobile }) => (!isMobile ? theme.spacing(3) : 0)};
  width: 100%;
`;

export const SubMenuTopBarContainer = ({
  children,
  title,
  Icon,
  className,
}: SubMenuTopBarContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <StyledContainer isMobile={isMobile} className={className}>
      {isMobile && <PageHeader title={title} Icon={Icon} />}
      <PageBody>{children}</PageBody>
    </StyledContainer>
  );
};
