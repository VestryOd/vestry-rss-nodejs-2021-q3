const { tasksDocument, updateTasksDocument } = require('../../common/local-db/tasks');
const Task = require('./model');

const getAllTasksByBoardId = async boardId => Promise.resolve(tasksDocument.filter(task => task.boardId === boardId));

const getTaskById = async taskId => Promise.resolve(tasksDocument.find(task => task.id === taskId ));

const createTask = async payload => {
  const task = new Task({ ...payload });
  tasksDocument.push(task);
  return Promise.resolve(task);
};

const updateTaskInfo = async (taskId, boardId, payload) => {
  const indexOfTask = tasksDocument.findIndex(el => el.id === taskId);
  if (indexOfTask === -1) return null;
  const updatedTask = {
    ...tasksDocument[indexOfTask],
    ...payload
  };
  tasksDocument[indexOfTask] = { ...updatedTask };
  return Promise.resolve(updatedTask);
};

const removeTaskById = async taskId => {
  const indexOfTask = tasksDocument.findIndex(el => el.id === taskId);
  const task = tasksDocument[indexOfTask];
  let deleted = null;
  if (indexOfTask && Object.entries(task).length) {
    deleted = tasksDocument.splice(indexOfTask, 1);
  }
  return !deleted || !deleted?.length
    ? null
    : `User ${task.title} with id ${taskId} was deleted`;
};

const deleteTaskByBoard = async boardId => {
  const cleared = tasksDocument.filter(task => task.boardId !== boardId);
  updateTasksDocument(cleared);
  return Promise.resolve(getAllTasksByBoardId(boardId));
};

const updateTaskWhenUserDeleted = async userId => {
  const tasks = [];
  const updated = tasksDocument.map(task => {
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
  updateTasksDocument(updated);
  return tasks;
  // return tasksDocument.filter(el => el.userId === userId);
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