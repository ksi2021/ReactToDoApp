import React, { useRef } from 'react';

import './newTaskForm.css';

function trim(val) {
  return val.current.value.trim();
}

function NewTaskForm({ createTask }) {
  const title = useRef();
  const min = useRef();
  const sec = useRef();

  return (
    <form
      action=""
      className="new-todo-form"
      onSubmit={(e) => {
        e.preventDefault();

        if (trim(title) && (trim(min) || trim(sec))) {
          createTask({ text: trim(title), min: trim(min), sec: trim(sec) });
          title.current.value = '';
          min.current.value = '';
          sec.current.value = '';
        }
      }}
    >
      <input ref={title} className="new-todo" placeholder="Task" autoFocus />
      <input ref={min} className="new-todo-form__timer" placeholder="Min" />
      <input ref={sec} className="new-todo-form__timer" placeholder="Sec" />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  );
}

export default NewTaskForm;
