import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';

function Task({ clas = '', task, onDelete, onComplete }) {
  return (
    <li className={task.complete ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" checked={task.complete} onChange={() => onComplete(task.id)} type="checkbox" />
        <label>
          <span className="description">{task.title}</span>
          <span className="created">
            Создано{' '}
            {formatDistanceToNow(task.date, {
              includeSeconds: true,
              locale: ru,
            })}{' '}
            назад
          </span>
        </label>
        <button className="icon icon-edit" />
        <button onClick={() => onDelete(task.id)} className="icon icon-destroy" />
      </div>
      {clas === 'editing' && <input type="text" className="edit" defaultValue="Editing task" />}
    </li>
  );
}

Task.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default Task;
