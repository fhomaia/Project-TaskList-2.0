const ObjectId = require('mongodb');
const connection = require('./connection');

const getTasks = () => connection()
  .then((db) => db.collection('tasks').find({}))
  .then((response) => response.toArray());

const createTask = (task) => connection()
  .then((db) => db.collection('tasks')
    .createOne(task));

const updateTask = ({ _id: taskId, message, status }) => connection()
  .then((db) => db.collection('tasks')
    .updateOne({ _id: taskId }, { $set: { message, status } }));

const deleteTask = (id) => connection()
  .then((db) => db.collection('tasks')
    .deleteOne({ id: ObjectId(id) }));

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
