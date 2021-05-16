const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'ColumnTitle', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

function generateColumns(arr) {
  return !arr.length ? [] : arr.map(col => new Column({...col}));
}

module.exports = {
  Column,
  generateColumns,
};