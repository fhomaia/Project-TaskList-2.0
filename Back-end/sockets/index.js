const taskManager = require('../controllers');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('createTask', async (task) => {
      await taskManager.createTask(task)
      const tasks = await taskManager.getTasks();
      io.emit('tasks', tasks);
    });
    socket.on('updateTask', async (task) => {
      await taskManager.updateTask(task)
      const tasks = await taskManager.getTasks();
      io.emit('tasks', tasks);
    });
    socket.on('deleteTask', async (_id) => {
      await taskManager.deleteTask(_id)
      const tasks = await taskManager.getTasks();
      io.emit('tasks', tasks);
    });
  });
};