import { v4 as uuidv4 } from 'uuid';

import { IColumn } from '../../interfaces';

type ColumnData = {
  title: string;
  order: number;
};

class Column implements IColumn {
  id: string;

  title: string;

  order: number;

  /**
   * @class Column
   * @param {string} id
   * @param {string} title
   * @param {number} order
   */
  constructor({ id = uuidv4(), title = 'ColumnTitle', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

/**
 * Iterate received array and return array of Column instances
 * @param {Array} arr
 * @returns {Column[]}
 */
function generateColumns(arr: ColumnData[]): IColumn[] {
  return !arr.length ? [] : arr.map((col) => new Column({ ...col }));
}

export = {
  Column,
  generateColumns,
};
