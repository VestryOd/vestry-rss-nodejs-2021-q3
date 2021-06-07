import { tasksDocument } from '../../common/local-db/tasks';
import { ITask } from '../../interfaces';
import Task, { taskPayload } from './model';

let DB = tasksDocument.map((el) => new Task(el));

const getAllTasksByBoardId = async (boardId: string): Promise<ITask[]> =>
  Promise.resolve(DB.filter((task) => task.boardId === boardId));

const getTaskById = async (taskId: string): Promise<ITask | null> =>
  Promise.resolve(DB.find((task) => task.id === taskId) || null);

const createTask = async (payload: taskPayload): Promise<ITask> => {
  const task = new Task({ ...payload });
  DB.push(task);
  return Promise.resolve(task);
};

const updateTaskInfo = async (
  taskId: string,
  _boardId: string,
  payload: taskPayload,
): Promise<null | ITask> => {
  const index = DB.findIndex((el) => el.id === taskId);
  const task = getTaskById(taskId);
  const updated = { ...task, ...{ id: taskId, ...payload } };
  if (index && index !== -1) {
    DB.splice(index, 1, updated);
  }
  return Promise.resolve(updated);
};

const removeTaskById = async (taskId: string): Promise<string | null> => {
  const indexOfTask = DB.findIndex((el) => el.id === taskId);
  const task = DB[indexOfTask] || null;
  let deleted = null;
  if (indexOfTask && task && Object.entries(task).length) {
    deleted = DB.splice(indexOfTask, 1);
  }
  const result =
    !deleted || !deleted?.length
      ? null
      : `User ${task?.title || 'task'} with id ${taskId} was deleted`;
  return Promise.resolve(result);
};

const deleteTaskByBoard = async (boardId: string): Promise<ITask[]> => {
  DB = DB.filter((task) => task.boardId !== boardId);
  const updated = await getAllTasksByBoardId(boardId);

  return Promise.resolve(updated);
};

const updateTaskWhenUserDeleted = async (userId: string): Promise<Task[]> => {
  DB.forEach((task, index) => {
    if (task.userId === userId) {
      DB[index] = { ...task, userId: null };
    }
  });
  return Promise.resolve(DB.filter((el) => el.userId === userId));
};

export {
  createTask,
  deleteTaskByBoard,
  getAllTasksByBoardId,
  getTaskById,
  removeTaskById,
  updateTaskInfo,
  updateTaskWhenUserDeleted,
};
