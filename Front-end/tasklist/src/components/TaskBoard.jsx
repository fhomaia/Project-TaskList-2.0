import React, { useState, useEffect } from 'react';

import TaskCard from './TaskCard';

function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => fetch('http://localhost:3001')
  .then((response) => response.json())
  .then((response) => setTasks(response))
  .catch(() => console.log('Server offline'));
  
  useEffect(fetchTasks,[]);
  return (
    <div>
      <div>
        <h2>Backlog</h2>
        {
          tasks.forEach((task) => {
            if (task.status === 'Backlog') {
              <TaskCard task/>
            }
          })
        }
      </div>
      <div>
      <h2>In Progress</h2>
        {
          tasks.map((task) => {
            if (task.status === 'In-Progress') {
              return <TaskCard key={task._id} task={task}/>
            }
          })
        }
      </div>
      <div>
      <h2>Testing</h2>
        {
          tasks.map((task) => {
            if (task.status === 'Testing') {
              return <TaskCard task={task} key={task._id}/>
            }
          })
        }
      </div>
      <div>
      <h2>Done</h2>
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