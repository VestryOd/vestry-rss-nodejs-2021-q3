const usersDocument = require('../../common/local-db/users');
const User = require('./model');

const getAllUsers = async () => Promise.resolve([...usersDocument]);

const getUserById = async userId => {
  const result = usersDocument.find(user => user.id === userId);
  if (!result) {
    return null;
  }
  return Promise.resolve(result);
};

const updateUserInfo = async (userId, payload) => {
  const indexOfUser = usersDocument.findIndex(el => el.id === userId);
  if (indexOfUser === -1) return null;
  const updatedUser = {
    ...usersDocument[indexOfUser],
    ...payload
  };
  usersDocument[indexOfUser] = { ...updatedUser };
  return Promise.resolve(updatedUser);
};

const createUser = async payload => {
  const user = new User(payload);
  usersDocument.push(user);
  return Promise.resolve(User.toResponse(user));
};

const removeUserById = async userId => {
  const indexOfUser = usersDocument.findIndex(el => el.id === userId);
  const user = usersDocument[indexOfUser];
  let deleted = null;
  if (indexOfUser && Object.keys(user).length) {
    deleted = usersDocument.splice(indexOfUser, 1);
  }
  return !deleted || !deleted?.length
    ? null
    : `User ${user.name} with id ${userId} was deleted`;
};


module.exports = { getAllUsers, getUserById, updateUserInfo, createUser, removeUserById };
