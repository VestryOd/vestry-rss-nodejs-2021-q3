import taskService from '../tasks/service';
import {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserInfo,
} from './memory.repository';
import { userCreatePayload, UserResponse } from './model';

const getAll = async (): Promise<UserResponse[]> => getAllUsers();

const getById = async (userId: string | undefined): Promise<UserResponse | null> =>
  getUserById(userId);

const update = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: userCreatePayload;
}): Promise<null | UserResponse> => updateUserInfo({ userId, payload });

const create = async (payload: userCreatePayload): Promise<UserResponse> => createUser(payload);

const remove = async (userId: string): Promise<string | null> => {
  await taskService.updateTasks(userId);
  return removeUserById(userId);
};

export default { create, getAll, getById, remove, update };
