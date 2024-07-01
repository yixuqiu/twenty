import { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/react';

const StyledEditableCellEditModeContainer = styled.div<RecordTableCellEditModeProps>`
  position: absolute;
  align-items: center;
  display: flex;
  min-width: 200px;
  width: calc(100% + 2px);
  z-index: 1;
  height: 100%;
`;

const StyledTableCellInput = styled.div`
  align-items: center;
  display: flex;

  min-height: 32px;
  min-width: 200px;

  z-index: 10;
`;

export type RecordTableCellEditModeProps = {
  children: ReactElement;
  transparent?: boolean;
  maxContentWidth?: number;
  initialValue?: string;
};

export const RecordTableCellEditMode = ({
  children,
}: RecordTableCellEditModeProps) => {
  const { refs, floatingStyles } = useFloating({
    placement: 'top-start',
    middleware: [flip(), offset(-32)],
    whileElementsMounted: autoUpdate,
  });

  return (
    <StyledEditableCellEditModeContainer
      ref={refs.setReference}
      data-testid="editable-cell-edit-mode-container"
    >
      {createPortal(
        <StyledTableCellInput ref={refs.setFloating} style={floatingStyles}>
          {children}
        </StyledTableCellInput>,
        document.body,
      )}
    </StyledEditableCellEditModeContainer>
  );
};
