import { v4 as uuidv4 } from 'uuid';

import { IBoard, IColumn } from '../../interfaces';

const { generateColumns } = require('./column.model');

class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumn[];
  /**
   * @class
   * @param {string} id
   * @param {string} title
   * @param {Array.<Column>} columns
   */

  constructor({ id = uuidv4(), title = 'BoardTitle', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = generateColumns(columns);
  }
}

export default Board;
