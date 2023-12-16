import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './taskList.css';

function TaskList({ onDelete, tasks, onComplete }) {
  return (
    <ul className="todo-list">
      {tasks.map((el) => (
        <Task task={el} key={el.id} onDelete={onDelete} onComplete={onComplete} />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  // task: PropTypes.shape(
  //     {
  //     id: PropTypes.number.isRequired,
  //     title: PropTypes.string.isRequired,
  //     complete: PropTypes.bool.isRequired,
  //     date: PropTypes.instanceOf(Date).isRequired
  // })
};

export default TaskList;
