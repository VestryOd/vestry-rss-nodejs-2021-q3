const { tasksDocument } = require('../../common/local-db/tasks');
const Task = require('./model');

let DB = [...tasksDocument];

const getAllTasksByBoardId = async boardId => Promise.resolve(DB.filter(task => task.boardId === boardId));

const getTaskById = async taskId => Promise.resolve(DB.find(task => task.id === taskId ));

const createTask = async payload => {
  const task = new Task({ ...payload });
  DB.push(task);
  return Promise.resolve(task);
};

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

const deleteTaskByBoard = async boardId => {
  DB = DB.filter(task => task.boardId !== boardId);
  const updated = await getAllTasksByBoardId(boardId);

  return Promise.resolve(updated);
};

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