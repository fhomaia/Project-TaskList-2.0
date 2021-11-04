import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function TaskCard(task) {
  const { _id, message, dueDate } = task;
  const [edit, setEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState(task);
  const socket = io('http://localhost:3001');
  const onClickDelete = socket.emit('deletTask', _id);
  const editMode = () => setEdit(!edit);

  const onChangeMessage = ({ target: { value }}) => (
    setUpdateTask({ ...updateTask, message: value })
  );

  const onChangeDueDate = ({ target: { value }}) => (
    setUpdateTask({ ...updateTask, dueDate: value })
  );

  const onClickConfirm = socket.emit('updateTask', task);

  const disableLeftArrow = (status) => {
    if (status === 'Backlog') return true;
    return false;
  }

  const disableRightArrow = (status) => {
    if (status === 'Done') return true;
    return false;
  }

  const moveTaskUpwards = (status) => {
    const statusArray = ['Backlog', 'In-Progress', 'Testing','Done'];
    const oldStatusPosition = statusArray.indexOf(status);
    setUpdateTask({ ...updateTask, status: statusArray[oldStatusPosition + 1] });
  }

 useEffect(() => socket.emit('updateTask', updateTask), [updateTask.status])

  const moveTaskDownwards = (status) => {
    const statusArray = ['Backlog','In-Progress', 'Testing', 'Done'];
    const oldStatusPosition = statusArray.indexOf(status);
    setUpdateTask({ ...updateTask, status: statusArray[oldStatusPosition - 1] });
    socket.emit('updateTask', updateTask);
  }

  const disableLeftArrow = (status) => {
    if (status === 'Backlog') return true;
    return false;
  }

  const disableRightArrow = (status) => {
    if (status === 'Done') return true;
    return false;
  }

  const moveTaskUpwards = (status) => {
    const statusArray = ['Backlog', 'In-Progress', 'Testing','Done'];
    const oldStatusPosition = statusArray.indexOf(status);
    setUpdateTask({ ...updateTask, status: statusArray[oldStatusPosition + 1] });
  }

 useEffect(() => socket.emit('updateTask', updateTask), [updateTask.status])

  const moveTaskDownwards = (status) => {
    const statusArray = ['Backlog','In-Progress', 'Testing', 'Done'];
    const oldStatusPosition = statusArray.indexOf(status);
    setUpdateTask({ ...updateTask, status: statusArray[oldStatusPosition - 1] });
    socket.emit('updateTask', updateTask);
  }

  if (edit) {
    return (
      <div>
      <button type='button' onClick={ onClickDelete } >X</button>
      <button type='button' onClick={ changeEditMode } >✏️</button>
      <textarea value={ updateTask.task } onChange={ (e) => onChangeMessage(e) } />
      <input value={ updateTask.dueDate } type='date' onChange={(e) => onChangeDueDate(e) } />
      <button
        type='button'
        disabled={ disableLeftArrow(updateTask.status) }
        onClick={() => moveTaskDownwards(updateTask.status)}
      >
        &larr;
      </button>
      <button
        type='button'
        disabled={ disableRightArrow(updateTask.status) }
        onClick={() => moveTaskUpwards(updateTask.status)}
      >
        &rarr;
      </button>
      <button type='button' onClick={ onClickConfirm } >Confirm</button>
      </div>
    )
  }
  return (
      <div>
      <button type='button' onClick={ onClickDelete } >X</button>
      <button type='button' onClick={ editMode } >✏️</button>
      <h3>{ message }</h3>
      <p>Due: { dueDate }</p>
      <button
        type='button'
        disabled={ disableLeftArrow(updateTask.status) }
        onClick={() => moveTaskDownwards(updateTask.status)}
      >
        &larr;
      </button>
      <button
        type='button'
        disabled={ disableRightArrow(updateTask.status) }
        onClick={() => moveTaskUpwards(updateTask.status)}
      >
        &rarr;
      </button>
      </div>
  )
}

export default TaskCard;