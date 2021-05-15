const usersRepo = require('./memory.repository');

const getAll = () => usersRepo.getAll();

module.exports = { getAll };
