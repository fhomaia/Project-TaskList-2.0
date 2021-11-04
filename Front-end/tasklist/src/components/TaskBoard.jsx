import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import TaskCard from './TaskCard';

function TaskBoard() {
  const socket  = io('http://localhost:3001')
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => fetch('http://localhost:3001')
  .then((response) => response.json())
  .then((response) => setTasks(response))
  .catch(() => console.log('Server offline'));

  
  useEffect(() => {
    fetchTasks();
    socket.on('tasks', (newTasks) => setTasks(newTasks));
  },[]);
  
  return (
    <div>
      <div>
        <h2>Backlog</h2>
        {
          tasks.map((task) => {
            if (task.status === 'Backlog') {
              return <TaskCard task={task} key={task._id} />
            }
          })
        }
      </div>
      <div>
      <h2>In Progress</h2>
        {
          tasks.forEach((task) => {
            if (task.status === 'In-progress') {
              <TaskCard key={task._id} task={task}/>
            }
          })
        }
      </div>
      <div>
      <h2>Testing</h2>
        {
          tasks.forEach((task) => {
            if (task.status === 'Testing') {
              <TaskCard task={task} key={task._id}/>
            }
          })
        }
      </div>
      <div>
      <h2>Done</h2>
        {
          tasks.forEach((task) => {
            if (task.status === 'Done') {
              <TaskCard task={task} key={task._id}/>
            }
          })
        }
      </div>
    </div>
  )
}

export default TaskBoard;