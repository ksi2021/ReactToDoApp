import React from 'react';

import './newTaskForm.css';

function NewTaskForm({ createTask }) {
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();

        const title = e.target[0].value.trim();
        if (title) {
          createTask(title);
          e.target[0].value = '';
        }
      }}
    >
      <input className="new-todo" placeholder="What needs to be done?" autoFocus />
    </form>
  );
}

export default NewTaskForm;
