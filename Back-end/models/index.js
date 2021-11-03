const connection = require('./connection');
const ObjectId = require('mongodb');

const getTasks = () => connection()
  .then((db) => db.collection('tasks').find({}))
  .then((response) => response.toArray());

const createTask = (task) => connection()
.then((db) => db.collection('tasks').createOne(task));

const updateTask = (task) => connection()
.then((db) => db.collection('tasks').updateOne({ id: task.id }, { $set: { ...task } }));

const deleteTask = (id) => connection()
.then((db) => db.collection('tasks').deleteOne({ id: ObjectId(id) }));

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
