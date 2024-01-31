import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';

import Timer from '../timer/timer';

class Task extends React.Component {
  state = {
    editing: false,
  };

  edit() {
    this.setState(({ editing }) => {
      return {
        editing: !editing,
      };
    });
  }

  editTitle(e) {
    if (e.target.elements[0].value.trim()) {
      const newTask = { ...this.props.task, title: e.target.elements[0].value.trim() };
      this.props.updateTask(newTask);
    }

    this.edit();
  }

  render() {
    const liClasses = [this.props.task.complete ? 'completed' : '', this.state.editing ? 'editing' : ''];
    return (
      <li className={liClasses.join(' ')}>
        <div className="view">
          <input
            className="toggle"
            checked={this.props.task.complete}
            onChange={() => this.props.onComplete(this.props.task.id)}
            type="checkbox"
          />
          <label>
            <span className="title">{this.props.task.title}</span>
            <Timer task={this.props.task} updateTime={this.props.updateTime} />
            <span className="created">
              Создано{' '}
              {formatDistanceToNow(this.props.task.date, {
                includeSeconds: true,
                locale: ru,
              })}{' '}
              назад
            </span>
          </label>
          <button onClick={() => this.edit()} className="icon icon-edit" />
          <button onClick={() => this.props.onDelete(this.props.task.id)} className="icon icon-destroy" />
        </div>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            this.editTitle(e);
          }}
        >
          <input type="text" className="edit" defaultValue={this.props.task.title} />
        </form>
      </li>
    );
  }
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
