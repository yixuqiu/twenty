import { ThemeColor } from 'twenty-ui';

import { RecordBoardColumnAction } from '@/object-record/record-board/types/RecordBoardColumnAction';

export type RecordBoardColumnDefinition = {
  id: string;
  title: string;
  value: string;
  position: number;
  color: ThemeColor;
  actions: RecordBoardColumnAction[];
};
