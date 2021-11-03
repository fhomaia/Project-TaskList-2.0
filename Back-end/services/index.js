const Joi = require('joi');

const tasksManagerModels = require('../models');

const getTasks = async () => {
  try {
    return await tasksManagerModels.getTasks();
  } catch (e) {
    return { message: 'Something is wrong...'};
  }
};

const createTask = async (task) => {
  const validation = Joi.object({
    task: Joi.string().required(),
    status: Joi.string().required(),
  }).validate(task);
  if (validation.error) return { message: validation.error };
  try {
    return await tasksManagerModels.createTask(task);
  } catch (e) {
    return { message: 'Something is wrong...' };
  }
};

const updateTask = async (task) => {
  if (!task._id) return { message: 'missing Id'}
  try {
    return await tasksManagerModels.updateTask(task);
  } catch (e) {
    return { message: 'Something is wrong...' };
  }
};

const deleteTask = async (id) => {
  try {
    return await tasksManagerModels.deleteTask(id);
  } catch (e) {
    return { message: 'Something is wrong...' };
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}