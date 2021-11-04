import React, { useState } from 'react';
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

  if (edit) {
    return (
      <div>
      <button type='button' onClick={onClickDelete} >X</button>
      <button type='button' onClick={editMode} >✏️</button>
      <textarea value={ updateTask.message } onChange={(e) => onChangeMessage(e) } />
      <input value={ updateTask.dueDate } onChange={(e) => onChangeDueDate(e) } />
      <button type='button'>&larr;</button>
      <button type='button'>&rarr;</button>
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
      <button type='button' >&larr;</button>
      <button type='button' >&rarr;</button>
      </div>
  )
}

export default TaskCard;