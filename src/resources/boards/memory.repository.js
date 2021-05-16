const boardsDocument = require('../../common/local-db/boards');
// const Board = require('./model');

const getAllBoards = async () => Promise.resolve([...boardsDocument]);

module.exports = { getAllBoards };