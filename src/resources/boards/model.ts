import { v4 as uuidv4 } from 'uuid';

import { IBoard, IColumn } from '../../interfaces';
import { generateColumns } from './column.model';

class Board implements IBoard {
  id: string;

  title: string;

  columns: Array<IColumn>;

  constructor({
    id = uuidv4(),
    title = 'BoardTitle',
    columns = [],
  }: {
    id: string;
    title: string;
    columns: Array<IColumn>;
  }) {
    this.id = id;
    this.title = title;
    this.columns = generateColumns(columns);
  }
}

export default Board;
