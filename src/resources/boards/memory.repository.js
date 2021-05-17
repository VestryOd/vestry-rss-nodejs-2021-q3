const boardsDocument = require('../../common/local-db/boards');
const Board = require('./model');

const DB = [...boardsDocument];

const getAllBoards = async () => Promise.resolve(DB);

const findBoard = boardId => {
  const board = {};
  DB.forEach((el, i) => {
    if (el.id === boardId) {
      board.index = i;
      board.data = { ...el };
    }
  });
  return board;
};

const createBoard = async payload => {
  const board = new Board({ ...payload });
  DB.push(board);
  return Promise.resolve({ ...board });
};

const getBoardById = async boardId => {
  const result = DB.find(board => board.id === boardId);
  if (!result) return null;
  return Promise.resolve({ ...result });
};

const updateBoard = async (boardId, payload) => {
  const { data, index } = findBoard(boardId);
  if (data && index) {
    DB[index] = {
      ...data,
      ...payload
    };
  }
  return !data && !index ? null : getBoardById(boardId);
};

const deleteById = async boardId => {
  const indexOfBoard = DB.findIndex(el => el.id === boardId);
  const board = DB[indexOfBoard];
  let deleted = null;
  if (indexOfBoard !== -1 && Object.keys(board).length) {
    deleted = DB.splice(indexOfBoard, 1);
  }
  const message = !deleted ? null : `Board ${board.title} with id ${boardId} was deleted`;
  return Promise.resolve(message);
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteById
};