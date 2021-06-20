import boardsDocument from '../../common/local-db/boards';
import { IBoard } from '../../interfaces';
import Board from './model';

const DB = boardsDocument.map((el) => new Board(el));

const getAllBoards = async (): Promise<IBoard[]> => Promise.resolve(DB);

const findBoard = (boardId: string) => {
  const board = { index: 0, data: {} };
  DB.forEach((el, i) => {
    if (el.id === boardId) {
      board.index = i;
      board.data = { ...el };
    }
  });
  return board;
};

const createBoard = async (payload: IBoard): Promise<IBoard> => {
  const board = new Board({ ...payload });
  DB.push(board);
  return Promise.resolve({ ...board });
};

const getBoardById = async (boardId: string): Promise<null | IBoard> => {
  const result = DB.find((board) => board.id === boardId);
  if (!result) return null;
  return Promise.resolve({ ...result });
};

const updateBoard = async (boardId: string, payload: IBoard): Promise<null | IBoard> => {
  const { data, index } = findBoard(boardId);
  if (data && index) {
    DB[index] = {
      ...data,
      ...payload,
    };
  }
  return !data && !index ? null : getBoardById(boardId);
};

const deleteById = async (boardId: string): Promise<string | null> => {
  const indexOfBoard = DB.findIndex((el) => el.id === boardId);
  const board = DB[indexOfBoard];
  let deleted = null;
  if (indexOfBoard !== -1 && board && Object.keys(board).length) {
    deleted = DB.splice(indexOfBoard, 1);
  }
  const message = !deleted ? null : `Board ${board?.title} with id ${boardId} was deleted`;
  return Promise.resolve(message);
};

export { createBoard, deleteById, getAllBoards, getBoardById, updateBoard };
