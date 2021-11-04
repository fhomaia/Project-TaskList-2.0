const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getTasks = () => connection()
  .then((db) => db.collection('tasks').find({}))
  .then((response) => response.toArray());

const createTask = (task) => {
  connection()
    .then((db) => db.collection('tasks').insertOne(task));
};

const updateTask = ({ _id: taskId, message, status, dueDate }) => connection()
  .then((db) => db.collection('tasks')
    .updateOne({ _id: ObjectId(taskId) }, { $set: { message, status, dueDate } }));

const deleteTask = (id) => connection()
  .then((db) => db.collection('tasks')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
