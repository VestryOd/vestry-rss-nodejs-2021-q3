const {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteById
} = require('./memory.repository');
const { clearTasksByBoardId } = require('../tasks/service');

const getAll = async() => getAllBoards && await getAllBoards() || null;

const getById = async boardId => getBoardById && await getBoardById(boardId) || null;

const create = async payload => createBoard && await createBoard(payload) || null;

const update = async (boardId, payload) => updateBoard && await updateBoard(boardId, payload) || null;

const remove = async boardId => {
  const cleared = await clearTasksByBoardId(boardId);
  if (!cleared.length) {
    return deleteById && await deleteById(boardId) || null;
  }
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};