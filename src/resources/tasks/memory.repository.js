const tasksDocument = require('../../common/local-db/tasks');
// const Task = require('./model');

const getAllTasks = async () => Promise.resolve([...tasksDocument]);

module.exports = { getAllTasks };