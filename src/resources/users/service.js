const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  createUser,
  removeUserById
} = require('./memory.repository');

const getAll = async () => getAllUsers && await getAllUsers() || null;

const getById = async userId => getUserById && await getUserById(userId) || null;

const update = async (userId, payload) => updateUserInfo && await updateUserInfo(userId, payload) || null;

const create = async payload => createUser && await createUser(payload) || null;

const remove = async userId => removeUserById && await removeUserById(userId) || null;

module.exports = { getAll, getById, update, create, remove };
