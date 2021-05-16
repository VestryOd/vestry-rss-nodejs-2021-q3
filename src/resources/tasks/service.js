const {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTaskInfo,
  removeTaskById,
  // deleteTaskByBoard,
  updateTaskWhenUserDeleted,
} = require('./memory.repository');

const getAllByBoardId = async boardId => getAllTasksByBoardId && await getAllTasksByBoardId(boardId) || null;

const getById = async taskId => getTaskById && await getTaskById(taskId) || null;

const create = async task => createTask && await createTask(task) || null;

const update = async (taskId, payload) => updateTaskInfo && await updateTaskInfo(taskId, payload) || null;

const deleteById = async taskId => removeTaskById && await removeTaskById(taskId) || null;

const updateTasks = async userId => updateTaskWhenUserDeleted && await updateTaskWhenUserDeleted(userId) || null;

module.exports = {
  getAllByBoardId,
  getById,
  create,
  update,
  deleteById,
  updateTasks
};