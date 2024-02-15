import React from 'react';
import './app.css';

import Header from '../header/header';
import Footer from '../footer/footer';
import TaskList from '../taskList/taskList';

function App() {
  const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
  const [tasks, setTasks] = React.useState([
    {
      title: 'Complete task',
      id: uid(),
      complete: true,
      date: new Date(),
      timer: {
        min: 1,
        sec: 0,
      },
    },
    {
      title: 'Editing task',
      id: uid(),
      complete: false,
      date: new Date(),
      timer: {
        min: 1,
        sec: 0,
      },
    },
    {
      title: 'Active task',
      id: uid(),
      complete: false,
      date: new Date(),
      timer: {
        min: 1,
        sec: 0,
      },
    },
  ]);
  const [filter, setFilters] = React.useState('all');

  const deleteTask = (id) => {
    setTasks((_tasks) => {
      const newTasks = _tasks.reduce((acc, el) => (el.id !== id ? [...acc, el] : acc), []);
      return newTasks;
    });
  };

  const updateTask = (task) => {
    setTasks((_tasks) => {
      const newTasks = _tasks.reduce((acc, el) => {
        if (el.id !== task.id) return [...acc, el];
        return [
          ...acc,
          {
            ...el,
            title: task.title,
          },
        ];
      }, []);
      return newTasks;
    });
  };

  const completeTask = (id) => {
    setTasks((_tasks) => {
      const newTasks = _tasks.reduce((acc, el) => {
        if (el.id !== id) return [...acc, el];
        return [
          ...acc,
          {
            ...el,
            complete: !el.complete,
          },
        ];
      }, []);
      return newTasks;
    });
  };

  const clearCompleted = () => {
    setTasks((_tasks) => {
      const leftTasks = _tasks.reduce((acc, el) => (el.complete ? acc : [...acc, el]), []);
      return leftTasks;
    });
  };

  const createTask = (task) => {
    setTasks((_tasks) => {
      const newTasks = [
        ..._tasks,
        {
          title: task.text,
          id: uid(),
          complete: false,
          date: new Date(),
          timer: {
            min: task.min || 0,
            sec: task.sec || 0,
          },
        },
      ];
      return newTasks;
    });
  };

  const setFilter = (value) => {
    setFilters(() => value);
  };

  const updateTime = (id, time) => {
    setTasks((_tasks) => {
      const newTasks = _tasks.reduce((acc, task) => {
        if (task.id !== id) return [...acc, task];
        return [
          ...acc,
          {
            ...task,
            timer: time,
          },
        ];
      }, []);
      return newTasks;
    });
  };

  const toDo = tasks.reduce((acc, el) => (el.complete ? acc : acc + 1), 0);
  // eslint-disable-next-line no-underscore-dangle
  let _tasks = [];
  if (filter === 'all') _tasks = tasks;
  else if (filter === 'completed') _tasks = tasks.reduce((acc, el) => (el.complete ? [...acc, el] : acc), []);
  else _tasks = tasks.reduce((acc, el) => (!el.complete ? [...acc, el] : acc), []);
  return (
    <section className="todoapp">
      <Header createTask={createTask} />
      <section className="main">
        <TaskList
          onDelete={deleteTask}
          tasks={_tasks}
          onComplete={completeTask}
          updateTask={updateTask}
          updateTime={updateTime}
        />
        <Footer filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} toDo={toDo} />
      </section>
    </section>
  );
}
export default App;
