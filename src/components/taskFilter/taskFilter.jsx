import './taskFilter.css';
import Label from './label';

function TaskFilter({ filter, setFilter }) {
  const params = ['All', 'Active', 'Completed'];
  return (
    <ul
      className="filters"
      onClick={(e) => {
        if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('selected')) {
          setFilter(e.target.textContent.toLowerCase());
        }
      }}
    >
      {params.map((val, index) => (
        <Label key={index} filter={filter} value={val} />
      ))}
    </ul>
  );
}

export default TaskFilter;
