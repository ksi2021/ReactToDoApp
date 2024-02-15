import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';

import Timer from '../timer/timer';

function Task(props) {
  const [editing, setEditing] = React.useState(false);

  const edit = () => {
    setEditing((e) => !e);
  };

  const editTitle = (e) => {
    if (e.target.elements[0].value.trim()) {
      const newTask = { ...props.task, title: e.target.elements[0].value.trim() };
      props.updateTask(newTask);
    }
    edit();
  };

  const liClasses = [props.task.complete ? 'completed' : '', editing ? 'editing' : ''];
  return (
    <li className={liClasses.join(' ')}>
      <div className="view">
        <input
          className="toggle"
          checked={props.task.complete}
          onChange={() => props.onComplete(props.task.id)}
          type="checkbox"
        />
        <label>
          <span className="title">{props.task.title}</span>
          <Timer task={props.task} updateTime={props.updateTime} />
          <span className="created">
            Создано{' '}
            {formatDistanceToNow(props.task.date, {
              includeSeconds: true,
              locale: ru,
            })}{' '}
            назад
          </span>
        </label>
        <button onClick={() => edit()} className="icon icon-edit" />
        <button onClick={() => props.onDelete(props.task.id)} className="icon icon-destroy" />
      </div>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          editTitle(e);
        }}
      >
        <input type="text" className="edit" defaultValue={props.task.title} />
      </form>
    </li>
  );
}

Task.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default Task;
