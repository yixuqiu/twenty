import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { actionBarEntriesState } from '@/ui/navigation/action-bar/states/actionBarEntriesState';
import { contextMenuPositionState } from '@/ui/navigation/context-menu/states/contextMenuPositionState';
import SharedNavigationModal from '@/ui/navigation/shared/components/NavigationModal';

import { contextMenuEntriesState } from '../states/contextMenuEntriesState';
import { contextMenuIsOpenState } from '../states/contextMenuIsOpenState';
import { PositionType } from '../types/PositionType';

import { ContextMenuItem } from './ContextMenuItem';

type StyledContainerProps = {
  position: PositionType;
};

const StyledContainerContextMenu = styled.div<StyledContainerProps>`
  align-items: flex-start;
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.strong};
  display: flex;
  flex-direction: column;
  gap: 1px;

  left: ${(props) => `${props.position.x}px`};
  position: fixed;
  top: ${(props) => `${props.position.y}px`};

  transform: translateX(-50%);
  width: auto;
  z-index: 2;
`;

export const ContextMenu = () => {
  const contextMenuPosition = useRecoilValue(contextMenuPositionState);
  const contextMenuIsOpen = useRecoilValue(contextMenuIsOpenState);
  const contextMenuEntries = useRecoilValue(contextMenuEntriesState);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const actionBarEntries = useRecoilValue(actionBarEntriesState);

  if (!contextMenuIsOpen) {
    return null;
  }

  const width = contextMenuEntries.some(
    (contextMenuEntry) => contextMenuEntry.label === 'Remove from favorites',
  )
    ? 200
    : undefined;

  return (
    <>
      <StyledContainerContextMenu
        className="context-menu"
        ref={wrapperRef}
        position={contextMenuPosition}
      >
        <DropdownMenu data-select-disable width={width}>
          <DropdownMenuItemsContainer>
            {contextMenuEntries.map((item, index) => {
              return <ContextMenuItem key={index} item={item} />;
            })}
          </DropdownMenuItemsContainer>
        </DropdownMenu>
      </StyledContainerContextMenu>
      <SharedNavigationModal
        actionBarEntries={actionBarEntries}
        customClassName="context-menu"
      />
    </>
  );
};
