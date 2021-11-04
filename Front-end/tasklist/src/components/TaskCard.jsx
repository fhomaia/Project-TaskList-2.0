import React from 'react';

function TaskCard(task) {
  const { message } = task
  return (
    <div>
      <h3>{message}</h3>
    </div>
  )
}

export default TaskCard;