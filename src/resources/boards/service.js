const {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteById
} = require('./memory.repository');
const { clearTasksByBoardId } = require('../tasks/service');

/**
 * Return result of execution 'getAllBoards' function
 * @returns {Promise<{columns: Column[], id: string, title: string}[]>}
 */
const getAll = async() => getAllBoards();

/**
 * Return result of execution 'getBoardById' function
 * @param {string} boardId
 * @returns {Promise<{columns: Column[], id: string, title: string}|null>}
 */
const getById = async boardId => getBoardById(boardId);

/**
 * Return result of execution 'createBoard' function
 * @param {{id: string, title: string, columns: Array.<Column> | Array}} payload
 * @returns {Promise<{columns: Column[], id: string, title: string}>}
 */
const create = async payload => createBoard(payload);

/**
 * Return result of execution 'updateBoard' function
 * @param {string} boardId
 * @param {{id: string, title: string, columns: Array.<Column> | Array}} payload
 * @returns {Promise<{columns: Column[], id: string, title: string} | null>}
 */
const update = async (boardId, payload) => updateBoard(boardId, payload);

/**
 * First we execute 'clearTasksByBoardId' function. If success - then delete board
 * by execution 'deleteById' function
 * @param {string} boardId
 * @returns {Promise<null | string>}
 */
const remove = async boardId => {
  const cleared = await clearTasksByBoardId(boardId);
  if (!cleared.length) {
    return deleteById(boardId);
  }
  return boardId;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
