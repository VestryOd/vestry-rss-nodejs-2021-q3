const boardsDocument = require('../../common/local-db/boards');
const Board = require('./model');

const DB = [...boardsDocument];

/**
 * Return all boards instances from DB
 * @returns {Promise<({columns: Column[], id: string, title: string})[]>}
 */
const getAllBoards = async () => Promise.resolve(DB);

/**
 * Service function, which return object with board data in field data and
 * board index in array in field index
 * @param {string} boardId
 * @returns {{index: number, data: Object.<Board>}}
 */
const findBoard = (boardId) => {
  const board = {};
  DB.forEach((el, i) => {
    if (el.id === boardId) {
      board.index = i;
      board.data = { ...el };
    }
  });
  return board;
};

/**
 * Return created board
 * @param {{id: string, title: string, columns: Array.<Column> | Array}} payload
 * @returns {Promise<{columns: Column[], id: string, title: string}>}
 */
const createBoard = async (payload) => {
  const board = new Board({ ...payload });
  DB.push(board);
  return Promise.resolve({ ...board });
};

/**
 * Return board instance found by board id param
 * @param {string} boardId
 * @returns {Promise<{columns: Column[], id: string, title: string}|null>}
 */
const getBoardById = async (boardId) => {
  const result = DB.find((board) => board.id === boardId);
  if (!result) return null;
  return Promise.resolve({ ...result });
};

/**
 * Update board instance by given data and if success - return updated board
 * @param {string} boardId
 * @param {{title: string, columns: Array.<Column> | Array}} payload
 * @returns {null | Promise<{Object.<Board>}>}
 */
const updateBoard = async (boardId, payload) => {
  const { data, index } = findBoard(boardId);
  if (data && index) {
    DB[index] = {
      ...data,
      ...payload,
    };
  }
  return !data && !index ? null : getBoardById(boardId);
};

/**
 * Remove board by given id. Return appropriated message or null.
 * @param {string} boardId
 * @returns {null | Promise<string>}
 */
const deleteById = async (boardId) => {
  const indexOfBoard = DB.findIndex((el) => el.id === boardId);
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
  deleteById,
};
