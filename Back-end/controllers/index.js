const tasksManagerServices = require('../services');

const getTasks = async (_req, res) => {
  const tasks =  await tasksManagerServices.getTasks();
  if (tasks.message) return res.status(500).json(tasks);
  return tasks;
}

const createTask = (task) => tasksManagerServices.createTask(task);

const updateTask = (task) => tasksManagerServices.updateTask(task);

const deleteTask = (_id) => tasksManagerServices.deleteTask(_id);

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}