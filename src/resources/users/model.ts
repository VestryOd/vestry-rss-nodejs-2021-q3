import { v4 as uuidv4 } from 'uuid';

import { IUser } from '../../interfaces';

export type UserResponse = {
  id: string;
  name: string;
  login: string;
};

class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * @class User
   * @param {string} id
   * @param {string} name
   * @param {string} login
   * @param {string} password
   */
  constructor({ id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return users data without password
   * @param {Object.<User>} user
   * @returns {{name: string, id: string, login: string}}
   */
  static toResponse(user: IUser): UserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
