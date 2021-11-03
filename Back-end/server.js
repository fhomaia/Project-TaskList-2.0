require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

console.log(process.env)

// const io = require('socket.io')(http, {
//   cors: {
//     origin: `http://localhost:${PORT}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   },
// });

const taskManagerControllers = require('./controllers');

app.use(bodyParser.json());
app.use(cors());

app.get('/', taskManagerControllers.getTasks);

http.listen(PORT, () => console.log(`App ouvindo na porta ${PORT}`));
