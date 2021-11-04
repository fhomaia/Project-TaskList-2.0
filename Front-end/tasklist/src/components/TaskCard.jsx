import React, { useState } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

function TaskCard(props) {
  const socket = io('http://localhost:3001');
  const { _id, task, dueDate } = props.task;

  const [edit, setEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState(props.task);

  const onClickDelete = () => socket.emit('deleteTask', _id);

  
  const onChangeMessage = ({ target: { value }}) => (
    setUpdateTask({ ...updateTask, task: value })
    );
    
  const onChangeDueDate = ({ target: { value }}) => (
    setUpdateTask({ ...updateTask, dueDate: value })
  );
  
  const changeEditMode = () => setEdit(!edit);
    
  const onClickConfirm = () => {
    socket.emit('updateTask', updateTask)
    changeEditMode();
  };

  if (edit) {
    return (
      <div>
      <button type='button' onClick={ onClickDelete } >X</button>
      <button type='button' onClick={ changeEditMode } >✏️</button>
      <textarea value={ updateTask.task } onChange={ (e) => onChangeMessage(e) } />
      <input value={ updateTask.dueDate } type='date' onChange={(e) => onChangeDueDate(e) } />
      <button type='button'>&larr;</button>
      <button type='button'>&rarr;</button>
      <button type='button' onClick={ onClickConfirm } >Confirm</button>
      </div>
    )
  }
  return (
      <div>
      <button type='button' onClick={ onClickDelete } >X</button>
      <button type='button' onClick={ changeEditMode } >✏️</button>
      <h3>{ task }</h3>
      <p>Due: { dueDate }</p>
      <button type='button' >&larr;</button>
      <button type='button' >&rarr;</button>
      </div>
  )
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    task: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
};

export default TaskCard;