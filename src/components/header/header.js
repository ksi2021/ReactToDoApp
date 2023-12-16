import React from 'react';
import './header.css';

import NewTaskForm from '../newTaskForm/newTaskForm';

function Header({ createTask }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm createTask={createTask} />
    </header>
  );
}

export default Header;
