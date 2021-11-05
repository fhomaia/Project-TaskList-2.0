require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3001;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

require('./sockets')(io);

const taskManagerControllers = require('./controllers');

app.use(bodyParser.json());
app.use(cors());

app.get('/', taskManagerControllers.fetchTasks);

http.listen(PORT, () => console.log(`App ouvindo na porta ${PORT}`));
