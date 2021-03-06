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
    <div id='taskboard' >
      <div className='statusrow' >
        <h2 className='statustitle' >Backlog</h2>
        {
          tasks.map((task) => {
            if (task.status === 'Backlog') {
              return <TaskCard task={task} key={task._id} />
            }
          })
        }
      </div>
      <div className='statusrow' >
      <h2 className='statustitle' >In Progress</h2>
        {
          tasks.map((task) => {
            if (task.status === 'In-Progress') {
              return <TaskCard key={task._id} task={task}/>
            }
          })
        }
      </div>
      <div className='statusrow' >
      <h2 className='statustitle' >Testing</h2>
        {
          tasks.map((task) => {
            if (task.status === 'Testing') {
              return <TaskCard task={task} key={task._id}/>
            }
          })
        }
      </div>
      <div className='statusrow' >
      <h2 className='statustitle' >Done</h2>
        {
          tasks.map((task) => {
            if (task.status === 'Done') {
              return <TaskCard task={task} key={task._id}/>
            }
          })
        }
      </div>
    </div>
  )
}

export default TaskBoard;