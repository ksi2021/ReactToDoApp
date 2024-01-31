import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './taskList.css';

function TaskList({ onDelete, tasks, onComplete, updateTask, updateTime }) {
  return (
    <ul className="todo-list">
      {tasks.map((el) => (
        <Task
          task={el}
          key={el.id}
          onDelete={onDelete}
          onComplete={onComplete}
          updateTask={updateTask}
          updateTime={updateTime}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ),
};

export default TaskList;
