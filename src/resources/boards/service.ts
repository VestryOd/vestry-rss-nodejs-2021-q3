import { IBoard } from '../../interfaces';
import taskService from '../tasks/service';
import {
  createBoard,
  deleteById,
  getAllBoards,
  getBoardById,
  updateBoard,
} from './memory.repository';

const getAll = async (): Promise<IBoard[]> => getAllBoards();

const getById = async (boardId: string): Promise<null | IBoard> => getBoardById(boardId);

const create = async (payload: IBoard): Promise<IBoard> => createBoard(payload);

const update = async (boardId: string, payload: IBoard): Promise<null | IBoard> =>
  updateBoard(boardId, payload);

const remove = async (boardId: string): Promise<string | null> => {
  const cleared = await taskService.clearTasksByBoardId(boardId);
  if (!cleared.length) {
    return deleteById(boardId);
  }
  return boardId;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
