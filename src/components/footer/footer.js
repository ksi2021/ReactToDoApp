import React from 'react';

import TaskFilter from '../taskFilter/taskFilter';

import './footer.css';

function Footer({ toDo = 0, clearCompleted, filter, setFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
