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
          tasks.forEach((task) => {
            if (task.status === 'In-progress') {
              <TaskCard task/>
            }
          })
        }
      </div>
      <div>
      <h2>Testing</h2>
        {
          tasks.forEach((task) => {
            if (task.status === 'Testing') {
              <TaskCard task/>
            }
          })
        }
      </div>
      <div>
      <h2>Done</h2>
        {
          tasks.forEach((task) => {
            if (task.status === 'Done') {
              <TaskCard task/>
            }
          })
        }
      </div>
    </div>
  )
}

export default TaskBoard;