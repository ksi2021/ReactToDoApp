import React from 'react';
import './app.css';

import Header from '../header/header';
import Footer from '../footer/footer';
import TaskList from '../taskList/taskList';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

    this.state = {
      tasks: [
        {
          title: 'Complete task',
          id: this.uid(),
          complete: true,
          date: new Date(),
        },
        {
          title: 'Editing task',
          id: this.uid(),
          complete: false,
          date: new Date(),
        },
        {
          title: 'Active task',
          id: this.uid(),
          complete: false,
          date: new Date(),
        },
      ],
      filter: 'all',
    };
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.reduce((acc, el) => (el.id !== id ? [...acc, el] : acc), []);
      return {
        tasks: newTasks,
      };
    });
  };

  updateTask = (task) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.reduce((acc, el) => {
        if (el.id !== task.id) return [...acc, el];
        return [
          ...acc,
          {
            ...el,
            title: task.title,
          },
        ];
      }, []);
      return {
        tasks: newTasks,
      };
    });
  };

  completeTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.reduce((acc, el) => {
        if (el.id !== id) return [...acc, el];
        return [
          ...acc,
          {
            ...el,
            complete: !el.complete,
          },
        ];
      }, []);
      return {
        tasks: newTasks,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const leftTasks = tasks.reduce((acc, el) => (el.complete ? acc : [...acc, el]), []);
      return {
        tasks: leftTasks,
      };
    });
  };

  createTask = (text) => {
    this.setState(({ tasks }) => {
      const newTasks = [
        ...tasks,
        {
          title: text,
          id: this.uid(),
          complete: false,
          date: new Date(),
        },
      ];
      return { tasks: newTasks };
    });
  };

  setFilter = (value) => {
    this.setState(() => ({
      filter: value,
    }));
  };

  render() {
    const { filter: stateFilter, tasks: stateTasks } = this.state;

    const toDo = stateTasks.reduce((acc, el) => (el.complete ? acc : acc + 1), 0);
    let tasks;
    if (stateFilter === 'all') tasks = stateTasks;
    else if (stateFilter === 'completed')
      tasks = stateTasks.reduce((acc, el) => (el.complete ? [...acc, el] : acc), []);
    else tasks = stateTasks.reduce((acc, el) => (!el.complete ? [...acc, el] : acc), []);
    return (
      <section className="todoapp">
        <Header createTask={this.createTask} />
        <section className="main">
          <TaskList onDelete={this.deleteTask} tasks={tasks} onComplete={this.completeTask} updateTask={this.updateTask} />
          <Footer filter={stateFilter} setFilter={this.setFilter} clearCompleted={this.clearCompleted} toDo={toDo} />
        </section>
      </section>
    );
  }
}
