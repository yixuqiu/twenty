import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Chip, ChipVariant } from 'twenty-ui';

import { AnimatedContainer } from '@/object-record/record-table/components/AnimatedContainer';
import { ExpandedListDropdown } from '@/ui/layout/expandable-list/components/ExpandedListDropdown';
import { isFirstOverflowingChildElement } from '@/ui/layout/expandable-list/utils/isFirstOverflowingChildElement';
import { useListenClickOutside } from '@/ui/utilities/pointer-event/hooks/useListenClickOutside';
import { isDefined } from '~/utils/isDefined';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: space-between;
  min-width: 100%;
  width: 100%;
`;

const StyledChildrenContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  overflow: hidden;
  max-width: 100%;
  flex: 0 1 fit-content;
  position: relative; // Needed so children elements compute their offsetLeft relatively to this element.
`;

const StyledChildContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  overflow: hidden;

  &:last-child {
    flex-shrink: 1;
  }
`;

const StyledChipCount = styled(Chip)`
  flex-shrink: 0;
`;

export type ExpandableListProps = {
  isChipCountDisplayed?: boolean;
  withExpandedListBorder?: boolean;
};

export type ChildrenProperty = {
  shrink: number;
  isVisible: boolean;
};

export const ExpandableList = ({
  children,
  isChipCountDisplayed: isChipCountDisplayedFromProps,
  withExpandedListBorder = false,
}: {
  children: ReactElement[];
} & ExpandableListProps) => {
  // isChipCountDisplayedInternal => uncontrolled display of the chip count.
  // isChipCountDisplayedFromProps => controlled display of the chip count.
  // If isChipCountDisplayedFromProps is provided, isChipCountDisplayedInternal is not taken into account.
  const [isChipCountDisplayedInternal, setIsChipCountDisplayedInternal] =
    useState(false);
  const isChipCountDisplayed = isDefined(isChipCountDisplayedFromProps)
    ? isChipCountDisplayedFromProps
    : isChipCountDisplayedInternal;

  const [isListExpanded, setIsListExpanded] = useState(false);

  // Used with floating-ui if anchorElement is not provided.
  // floating-ui mentions that `useState` must be used instead of `useRef`
  // @see https://floating-ui.com/docs/useFloating#elements
  const [childrenContainerElement, setChildrenContainerElement] =
    useState<HTMLDivElement | null>(null);

  const [previousChildrenContainerWidth, setPreviousChildrenContainerWidth] =
    useState(childrenContainerElement?.clientWidth ?? 0);

  const containerRef = useRef<HTMLDivElement>(null);

  const [firstHiddenChildIndex, setFirstHiddenChildIndex] = useState(
    children.length,
  );

  const hiddenChildrenCount = children.length - firstHiddenChildIndex;
  const canDisplayChipCount = isChipCountDisplayed && hiddenChildrenCount > 0;

  const handleChipCountClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsListExpanded(true);
  }, []);

  const resetFirstHiddenChildIndex = useCallback(() => {
    setFirstHiddenChildIndex(children.length);
  }, [children.length]);

  // Recompute first hidden child when:
  // - isChipCountDisplayed changes
  // - children length changes
  useEffect(() => {
    resetFirstHiddenChildIndex();
  }, [isChipCountDisplayed, children.length, resetFirstHiddenChildIndex]);

  useListenClickOutside({
    refs: [containerRef],
    callback: () => {
      // Handle container resize
      if (
        childrenContainerElement?.clientWidth !== previousChildrenContainerWidth
      ) {
        resetFirstHiddenChildIndex();
        setPreviousChildrenContainerWidth(
          childrenContainerElement?.clientWidth ?? 0,
        );
      }
    },
  });

  return (
    <StyledContainer
      ref={containerRef}
      onMouseEnter={
        isChipCountDisplayedFromProps
          ? undefined
          : () => setIsChipCountDisplayedInternal(true)
      }
      onMouseLeave={
        isChipCountDisplayedFromProps
          ? undefined
          : () => setIsChipCountDisplayedInternal(false)
      }
    >
      <StyledChildrenContainer ref={setChildrenContainerElement}>
        {children.slice(0, firstHiddenChildIndex).map((child, index) => (
          <StyledChildContainer
            key={index}
            ref={(childElement) => {
              if (
                // First element is always displayed.
                index > 0 &&
                isFirstOverflowingChildElement({
                  containerElement: childrenContainerElement,
                  childElement,
                })
              ) {
                setFirstHiddenChildIndex(index);
              }
            }}
          >
            {child}
          </StyledChildContainer>
        ))}
      </StyledChildrenContainer>
      {canDisplayChipCount && (
        <AnimatedContainer>
          <StyledChipCount
            label={`+${hiddenChildrenCount}`}
            variant={ChipVariant.Highlighted}
            onClick={handleChipCountClick}
          />
        </AnimatedContainer>
      )}
      {isListExpanded && (
        <ExpandedListDropdown
          anchorElement={containerRef.current ?? undefined}
          onClickOutside={() => {
            resetFirstHiddenChildIndex();
            setIsListExpanded(false);
          }}
          withBorder={withExpandedListBorder}
        >
          {children}
        </ExpandedListDropdown>
      )}
    </StyledContainer>
  );
};
