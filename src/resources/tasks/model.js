const { v4: uuidv4 } = require('uuid');

class Task {
    /**
     * @class Task
     * @param {string} id
     * @param {string} title
     * @param {number} order
     * @param {string} description
     * @param {string} userId
     * @param {string} boardId
     * @param {string} columnId
     */
    constructor({
        id = uuidv4(),
        title = 'Task title',
        order = 0,
        description = 'Task description',
        userId = '',
        boardId = '',
        columnId = '',
    } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}

module.exports = Task;
