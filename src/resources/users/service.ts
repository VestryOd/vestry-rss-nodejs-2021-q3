import {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserInfo,
} from './memory.repository';
import { userCreatePayload, UserResponse } from './model';

export type updateUser = {
  userId: string;
  payload: userCreatePayload;
};

const { updateTasks } = require('../tasks/service');

const getAll = async () => getAllUsers();

const getById = async (userId: string | undefined) => getUserById(userId);

const update = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: userCreatePayload;
}): Promise<null | UserResponse> => updateUserInfo({ userId, payload });

const create = async (payload: userCreatePayload): Promise<UserResponse> => createUser(payload);

const remove = async (userId: string): Promise<string | null> => {
  await updateTasks(userId);
  return removeUserById(userId);
};

module.exports = { getAll, getById, update, create, remove };
