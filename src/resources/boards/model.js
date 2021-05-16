const uuid = require('uuid');
const { generateColumns } = require('./column.model');

class Board {
    constructor({ id = uuid(), title = 'BoardTitle', columns = [] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = generateColumns(columns);
    }
}

module.exports = Board;