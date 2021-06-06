import usersDocument from '../../common/local-db/users';
import { unionTwoObjects } from '../../common/utills';
import User, { userCreatePayload, UserResponse } from './model';

const DB = usersDocument.map((el) => new User(el));

const getAllUsers = async (): Promise<UserResponse[]> => Promise.resolve(DB);

const getUserById = async (userId: string | undefined): Promise<null | UserResponse> => {
  const result = DB.find((user) => user.id === userId);
  if (!result) {
    return null;
  }
  return Promise.resolve(User.toResponse(result));
};

const updateUserInfo = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: userCreatePayload;
}): Promise<null | UserResponse> => {
  DB.map((el) => (el.id !== userId ? el : unionTwoObjects(el, payload)));
  return getUserById(userId);
};

const createUser = async (payload: userCreatePayload): Promise<UserResponse> => {
  const user = new User(payload);
  DB.push(user);
  return Promise.resolve(user);
};

const removeUserById = async (userId: string): Promise<null | string> => {
  const indexOfUser = DB.findIndex((el) => el.id === userId);
  const user = DB[indexOfUser];
  let deleted = null;
  if (indexOfUser && typeof user === 'object' && Object.keys(user)?.length) {
    deleted = DB.splice(indexOfUser, 1);
  }
  return !deleted || !deleted?.length ? null : `User ${user?.name} with id ${userId} was deleted`;
};

export { createUser, getAllUsers, getUserById, removeUserById, updateUserInfo };
