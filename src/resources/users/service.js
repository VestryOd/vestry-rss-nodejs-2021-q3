const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  createUser,
  removeUserById
} = require('./memory.repository');
const { updateTasks } = require('../tasks/service');

/**
 * Return result of execution 'getAllUsers' function
 * @returns {Promise<{id: string, name: string, login: string}[]>}
 */
const getAll = async () => getAllUsers();

/**
 * Return result of execution 'getUserById' function
 * @param {string} userId
 * @returns {Promise<Object.<User>|null>}
 */
const getById = async userId => getUserById(userId);

/**
 * Return result of execution 'updateUserInfo' function
 * @param {string} userId
 * @param {{name: string, login: string, password: string}} payload
 * @returns {Promise<null|Object.<User>>}
 */
const update = async ({ userId, payload }) => updateUserInfo({ userId, payload });

/**
 * Return result of execution 'createUser' function
 * @param {{name: string, login: string, password: string}} payload
 * @returns {Promise<Object.<User>>}
 */
const create = async payload => createUser(payload);

/**
 * First we execute 'updateTasks' function - set appropriate field yo null,
 * then we execute 'removeUserById' and delete user.
 * @param {string} userId
 * @returns {Promise<null|Object.<User>>}
 */
const remove = async userId => {
  await updateTasks(userId);
  return removeUserById(userId);
};

module.exports = { getAll, getById, update, create, remove };
