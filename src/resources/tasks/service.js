const {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTaskInfo,
  removeTaskById,
  deleteTaskByBoard,
  updateTaskWhenUserDeleted,
} = require('./memory.repository');

/**
 * Return result of execution 'getAllTasksByBoardId' function
 * @param {string} boardId
 * @returns {Promise<Object<Task>[]>}
 */
const getAllByBoardId = async boardId => getAllTasksByBoardId(boardId);

/**
 * Return result of execution 'getTaskById' function
 * @param {string} taskId
 * @returns {Promise<undefined|Object<Task>>}
 */
const getById = async taskId => getTaskById(taskId);

/**
 * Return result of execution 'createTask' function
 * @param {{
 *   title: string,
 *    order: number,
 *    description: string,
 *    userId: string
 * }} task
 * @returns {Promise<Task>}
 */
const create = async task => createTask(task);

/**
 * Return result of execution 'updateTaskInfo' function
 * @param {string} taskId
 * @param {string} boardId
 * @param {{
 *   title: string,
 *    order: number,
 *    description: string,
 *    userId: string
 * }} payload
 * @returns {Promise<Object<Task>|null>}
 */
const update = async (taskId, boardId, payload) => updateTaskInfo(taskId, boardId, payload);

/**
 * Return result of execution 'removeTaskById' function
 * @param {string} taskId
 * @returns {Promise<null | string>}
 */
const deleteById = async taskId => removeTaskById(taskId);

/**
 * Return result of execution 'removeTaskById' function
 * @param {string} boardId
 * @returns {Promise<Object<Task>[]>}
 */
const clearTasksByBoardId = async boardId => deleteTaskByBoard(boardId);

/**
 * Return result of execution 'updateTaskWhenUserDeleted' function
 * @param {string} userId
 * @returns {Promise<Task[]|Task[]>}
 */
const updateTasks = async userId => updateTaskWhenUserDeleted(userId);

module.exports = {
  getAllByBoardId,
  getById,
  create,
  update,
  deleteById,
  clearTasksByBoardId,
  updateTasks
};
