import React, { useState } from 'react';
import { io } from 'socket.io-client';

function Form() {
  const socket = io('http://localhost:3001');
  const [task, setTask] = useState({ task: '', status: 'Backlog', dueDate:''});
  const onChangeTask = ({ target: { value }}) => setTask({ ...task, task: value });
  const onChangeStatus = ({ target: { value }}) => setTask({ ...task, status: value });
  const onChangeDueDate = ({ target: { value }}) => setTask({ ...task, dueDate: value });
  const onClickCreate = () => socket.emit('createTask', task);
  const disableCreate = () => {
    if (!task.task || !task.dueDate) return true;
    return false;
  };

  return (
    <form id='taskform'>
      <label htmlFor='task'>
        <textarea
        id='task'
        placeholder='Insert a task'
        onChange={(event) => onChangeTask(event)}
        />
      </label>
      <label htmlFor='statusbox'>
        Status
      <select id='statusbox' onChange={(event) => onChangeStatus(event)} >
        <option value='Backlog'>Backlog</option>
        <option value='In-Progress'>In Progress</option>
        <option value='Testing'>Testing</option>
        <option value='Done'>Done</option>
      </select>
      </label>
      <label>
        Due Date: <input type='date' onChange={(event) => onChangeDueDate(event)}/>
      </label>
      <button
        type='button'
        onClick={onClickCreate}
        disabled={disableCreate()}
        className='specialbutton'
      >
        Create
      </button>
    </form>
  );
}

export default Form;