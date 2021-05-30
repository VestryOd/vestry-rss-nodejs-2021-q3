const usersDocument = require('../../common/local-db/users');
const User = require('./model');

const DB = [...usersDocument];

/**
 * Return all users instances from DB
 * @returns {Promise<({id: string, name: string, login: string})[]>}
 */
const getAllUsers = async () => Promise.resolve(DB);

/**
 * Return certain user by given user id param.
 * @param {string} userId
 * @returns {Promise<Object.<User>> | null}
 */
const getUserById = async userId => {
  const result = DB.find(user => user.id === userId);
  if (!result) {
    return null;
  }
  return Promise.resolve(result);
};

/**
 * Update certain user instance by given data. If success - return updated object.
 * @param {string} userId
 * @param {{name: string, login: string, password: string}} payload
 * @returns {Promise<null | Object.<User>>}
 */
const updateUserInfo = async ({ userId, payload }) => {
  const indexOfUser = DB.findIndex(el => el.id === userId);
  if (indexOfUser === -1) return null;
  const updatedUser = {
    ...DB[indexOfUser],
    ...payload
  };
  DB[indexOfUser] = updatedUser;
  return Promise.resolve({ ...updatedUser });
};

/**
 * Create an instance of User and return it.
 * @param {{name: string, login: string, password: string}} payload
 * @returns {Promise<Object.<User>>}
 */
const createUser = async payload => {
  const user = new User(payload);
  DB.push(user);
  return Promise.resolve(User.toResponse(user));
};

/**
 * Remove certain user by given user id param. If success - return appropriate message or null.
 * @param {string} userId
 * @returns {Promise<null | Object.<User>>}
 */
const removeUserById = async userId => {
  const indexOfUser = DB.findIndex(el => el.id === userId);
  const user = DB[indexOfUser];
  let deleted = null;
  if (indexOfUser && Object.keys(user).length) {
    deleted = DB.splice(indexOfUser, 1);
  }
  return !deleted || !deleted?.length
    ? null
    : `User ${user.name} with id ${userId} was deleted`;
};


module.exports = { getAllUsers, getUserById, updateUserInfo, createUser, removeUserById };
