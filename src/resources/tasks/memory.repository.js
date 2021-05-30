const { tasksDocument } = require('../../common/local-db/tasks');
const Task = require('./model');

let DB = [...tasksDocument];

/**
 * Return all tasks by given board id param
 * @param {string} boardId
 * @returns {Promise<(Object.<Task>)[]>}
 */
const getAllTasksByBoardId = async boardId => Promise.resolve(DB.filter(task => task.boardId === boardId));

/**
 * Return task instance by given task id param
 * @param {string} taskId
 * @returns {Promise<undefined | Object.<Task>>}
 */
const getTaskById = async taskId => Promise.resolve(DB.find(task => task.id === taskId ));

/**
 * Create an instance of Task class and return it
 * @param {{
 *    id: string,
 *    title: string,
 *    order: number,
 *    description: string,
 *    userId: string,
 *    boardId: string,
 *    columnId: string
 * }} payload
 * @returns {Promise<Task>}
 */
const createTask = async payload => {
  const task = new Task({ ...payload });
  DB.push(task);
  return Promise.resolve(task);
};

/**
 * Update task instance by given taskId, boardId and data and if success - return updated task
 * @param {string} taskId
 * @param {string} boardId
 * @param {{
 *    title: string,
 *    order: number,
 *    description: string,
 *    userId: string
 * }} payload
 * @returns {Promise<Object.<Task>|null>}
 */
const updateTaskInfo = async (taskId, boardId, payload) => {
  const indexOfTask = DB.findIndex(el => el.id === taskId);
  if (indexOfTask === -1) return null;
  const updatedTask = {
    ...DB[indexOfTask],
    ...payload
  };
  DB[indexOfTask] = { ...updatedTask };
  return Promise.resolve(updatedTask);
};

/**
 * Remove task by given id param. Return appropriated message or null.
 * @param {string} taskId
 * @returns {null | Promise<string>}
 */
const removeTaskById = async taskId => {
  const indexOfTask = DB.findIndex(el => el.id === taskId);
  const task = DB[indexOfTask];
  let deleted = null;
  if (indexOfTask && Object.entries(task).length) {
    deleted = DB.splice(indexOfTask, 1);
  }
  const result = !deleted || !deleted?.length
    ? null
    : `User ${task.title} with id ${taskId} was deleted`;
  return Promise.resolve(result)
};

/**
 * Remove task by given board id param. If success - return updated task.
 * @param {string} boardId
 * @returns {Promise<Object<Task>[]>}
 */
const deleteTaskByBoard = async boardId => {
  DB = DB.filter(task => task.boardId !== boardId);
  const updated = await getAllTasksByBoardId(boardId);

  return Promise.resolve(updated);
};

/**
 * Get all tasks, where userId is equal to given param and set appropriate filed userId
 * to null in all those objects. Return all updated tasks.
 * @param {string} userId
 * @returns {Promise<Task[] | []>}
 */
const updateTaskWhenUserDeleted = async userId => {
  const tasks = [];
  DB = DB.map(task => {
    const upd = task.userId !== userId
      ? task
      : {
        ...task,
        userId: null
      };
    if (upd.userId === null) {
      tasks.push(upd);
    }
    return upd;
    }
  );
  return Promise.resolve(tasks);
};

module.exports = {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTaskInfo,
  removeTaskById,
  deleteTaskByBoard,
  updateTaskWhenUserDeleted
};
