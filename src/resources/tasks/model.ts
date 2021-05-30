import { v4 as uuidv4 } from 'uuid';

import { ITask } from '../../interfaces';

class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string;

  boardId: string;

  columnId: string;
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

export default Task;
