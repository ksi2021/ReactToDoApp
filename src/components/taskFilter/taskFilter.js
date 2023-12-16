import './taskFilter.css';

function TaskFilter({ filter, setFilter }) {
  return (
    <ul
      className="filters"
      onClick={(e) => {
        if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('selected')) {
          setFilter(e.target.textContent.toLowerCase());
        }
      }}
    >
      <li>
        <button className={filter === 'all' ? 'selected' : ''}>All</button>
      </li>
      <li>
        <button className={filter === 'active' ? 'selected' : ''}>Active</button>
      </li>
      <li>
        <button className={filter === 'completed' ? 'selected' : ''}>Completed</button>
      </li>
    </ul>
  );
}

export default TaskFilter;
