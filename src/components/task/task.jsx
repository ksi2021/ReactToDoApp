import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';

class Task extends React.Component {
  state = { editing: false };

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

  // eslint-disable-next-line class-methods-use-this
  timerFormat(val) {
    if (val < 10) return `0${val}`;
    return val;
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
            <span className="description">
              <button className="icon icon-play" onClick={() => {}}></button>
              <button className="icon icon-pause" onClick={() => {}}></button>
              {/* time start */}
              {this.timerFormat(this.props.task.timer.min)}:{this.timerFormat(this.props.task.timer.sec)}
              {/* time end */}
            </span>
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
