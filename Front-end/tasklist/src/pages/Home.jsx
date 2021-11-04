import React from 'react';
import Form from '../components/Form';
import TaskBoard from '../components/TaskBoard';

function Home() {
  return (
    <div>
      <h1>Task List</h1>
      <Form />
      <TaskBoard />
    </div>
  )
}

export default Home;