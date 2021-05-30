const { v4: uuidv4 } = require('uuid');


class Column {
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
function generateColumns(arr) {
  return !arr.length ? [] : arr.map(col => new Column({...col}));
}

module.exports = {
  Column,
  generateColumns,
};
