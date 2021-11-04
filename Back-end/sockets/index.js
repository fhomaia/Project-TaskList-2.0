const taskManager = require('../controllers');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('createTask', async (task) => {
      const tasks = await taskManager.createTask(task)
      io.emit('tasks', tasks);
    });
    socket.on('updateTask', async (task) => {
      const tasks =await taskManager.updateTask(task);
      io.emit('tasks', tasks);
    });
    socket.on('deleteTask', async (_id) => {
      const tasks = await taskManager.deleteTask(_id);
      io.emit('tasks', tasks);
    });
  });
};