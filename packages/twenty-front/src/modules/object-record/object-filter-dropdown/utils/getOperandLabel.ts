import { ViewFilterOperand } from '@/views/types/ViewFilterOperand';

export const getOperandLabel = (
  operand: ViewFilterOperand | null | undefined,
) => {
  switch (operand) {
    case ViewFilterOperand.Contains:
      return 'Contains';
    case ViewFilterOperand.DoesNotContain:
      return "Doesn't contain";
    case ViewFilterOperand.GreaterThan:
      return 'Greater than';
    case ViewFilterOperand.LessThan:
      return 'Less than';
    case ViewFilterOperand.Is:
      return 'Is';
    case ViewFilterOperand.IsNot:
      return 'Is not';
    case ViewFilterOperand.IsNotNull:
      return 'Is not null';
    case ViewFilterOperand.IsEmpty:
      return 'Is empty';
    case ViewFilterOperand.IsNotEmpty:
      return 'Is not empty';
    default:
      return '';
  }
};

export const getOperandLabelShort = (
  operand: ViewFilterOperand | null | undefined,
) => {
  switch (operand) {
    case ViewFilterOperand.Is:
    case ViewFilterOperand.Contains:
      return ': ';
    case ViewFilterOperand.IsNot:
    case ViewFilterOperand.DoesNotContain:
      return ': Not';
    case ViewFilterOperand.IsNotNull:
      return ': NotNull';
    case ViewFilterOperand.IsNotEmpty:
      return ': NotEmpty';
    case ViewFilterOperand.IsEmpty:
      return ': Empty';
    case ViewFilterOperand.GreaterThan:
      return '\u00A0> ';
    case ViewFilterOperand.LessThan:
      return '\u00A0< ';
    default:
      return ': ';
  }
};
