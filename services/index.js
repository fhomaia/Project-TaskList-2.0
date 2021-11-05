const Joi = require('joi');

const tasksManagerModels = require('../models');

const getTasks = async () => {
  try {
    return await tasksManagerModels.getTasks();
  } catch (e) {
    return { message: 'Something is wrong...'};
  }
};

const validateTaskInput = (task) => Joi.object({
  task: Joi.string().required(),
  status: Joi.string().required(),
  dueDate: Joi.string().required(),
}).validate(task);

const createTask = async (task) => {
  if (validateTaskInput(task).error) return { message: validateTaskInput.error };
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

const deleteTask = async (_id) => {
  try {
    return await tasksManagerModels.deleteTask(_id);
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