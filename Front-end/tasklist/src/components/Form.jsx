import React, { useState } from 'react';
import { io } from 'socket.io-client';

function Form() {
  const socket = io();
  const [task, setTask] = useState({ task: '', status: 'Backlog'});
  const onInputChange = ({ target: { value }}) => setTask({ ...task, task: value });
  const onSelectChange = ({ target: { value }}) => setTask({ ...task, status: value });
  const onClickButton = () => socket.emit('createTask', task);
  console.log(task)
  return (
    <form>
      <label htmlFor='task'>
        <input
        id='task'
        placeholder='Insert a task'
        onChange={(event) => onInputChange(event)}
        />
      </label>
      <label htmlFor='statusbox'>
        Status
      <select id='statusbox' onChange={(event) => onSelectChange(event)} >
        <option value='Backlog'>Backlog</option>
        <option value='In-Progress'>In Progress</option>
        <option value='Testing'>Testing</option>
        <option value='Done'>Done</option>
      </select>
      </label>
      <button type='button' onClick={onClickButton} >Create</button>
    </form>
  );
}

export default Form;