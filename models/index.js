const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getTasks = () => connection()
  .then((db) => db.collection('tasks').find({}))
  .then((response) => response.toArray());

const createTask = async (task) => connection()
    .then((db) => db.collection('tasks').insertOne(task))
    .then(() => getTasks());

const updateTask = ({ _id: taskId, task, status, dueDate }) => connection()
    .then((db) => db.collection('tasks')
      .updateOne({ _id: ObjectId(taskId) }, { $set: { task, status, dueDate } }))
    .then(() => getTasks());

const deleteTask = (id) => connection()
  .then((db) => db.collection('tasks')
    .deleteOne({ _id: ObjectId(id) }))
  .then(() => getTasks());

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
