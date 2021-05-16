const boardsDocument = require('../../common/local-db/boards');
const Board = require('./model');

const getAllBoards = async () => Promise.resolve([...boardsDocument]);

const findBoard = boardId => {
  const board = {};
  boardsDocument.forEach((el, i) => {
    if (el.id === boardId) {
      board.index = i;
      board.data = { ...el };
    }
  });
  return board;
};

const createBoard = async payload => {
  const board = new Board({ ...payload });
  boardsDocument.push(board);
  return Promise.resolve({ ...board });
};

const getBoardById = async boardId => {
  const result = boardsDocument.find(board => board.id === boardId);
  if (!result) return null;
  return Promise.resolve({ ...result });
};

const updateBoard = async (boardId, payload) => {
  const { data, index } = findBoard(boardId);
  if (data && index) {
    boardsDocument[index] = {
      ...data,
      ...payload
    };
  }
  return !data && !index ? null : getBoardById(boardId);
};

const deleteById = async boardId => {
  const { data, index } = findBoard(boardId);
  let deleted = null;
  if (data && index) {
    deleted = boardsDocument.splice(index, 1);
  }
  return !deleted || !deleted.length
    ? null
    : `Board ${data.title} with id ${boardId} was deleted`;
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteById
};