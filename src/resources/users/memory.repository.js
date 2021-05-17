const usersDocument = require('../../common/local-db/users');
const User = require('./model');

const DB = [...usersDocument];

const getAllUsers = async () => Promise.resolve(DB);

const getUserById = async userId => {
  const result = DB.find(user => user.id === userId);
  if (!result) {
    return null;
  }
  return Promise.resolve(result);
};

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

const createUser = async payload => {
  const user = new User(payload);
  DB.push(user);
  return Promise.resolve(User.toResponse(user));
};

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
