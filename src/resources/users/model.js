const { v4: uuidv4 } = require('uuid');

class User {
  /**
   * @class User
   * @param {string} id
   * @param {string} name
   * @param {string} login
   * @param {string} password
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
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
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
