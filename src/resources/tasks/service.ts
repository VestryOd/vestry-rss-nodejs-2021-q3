import { ITask } from '../../interfaces';
import {
  createTask,
  deleteTaskByBoard,
  getAllTasksByBoardId,
  getTaskById,
  removeTaskById,
  updateTaskInfo,
  updateTaskWhenUserDeleted,
} from './memory.repository';
import { taskPayload } from './model';

const getAllByBoardId = async (boardId: string): Promise<ITask[]> => getAllTasksByBoardId(boardId);

const getById = async (taskId: string): Promise<ITask | null> => getTaskById(taskId);

const create = async (task: taskPayload): Promise<ITask> => createTask(task);

const update = async (
  taskId: string,
  boardId: string,
  payload: taskPayload,
): Promise<ITask | null> => updateTaskInfo(taskId, boardId, payload);

const deleteById = async (taskId: string): Promise<string | null> => removeTaskById(taskId);

const clearTasksByBoardId = async (boardId: string): Promise<ITask[]> => deleteTaskByBoard(boardId);

const updateTasks = async (userId: string): Promise<ITask[]> => updateTaskWhenUserDeleted(userId);

export default {
  clearTasksByBoardId,
  create,
  deleteById,
  getAllByBoardId,
  getById,
  update,
  updateTasks,
};
