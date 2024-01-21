import React from 'react';

function Label({ filter, value }) {
  return (
    <li>
      <button className={filter === value.toLowerCase() ? 'selected' : ''}>{value}</button>
    </li>
  );
}

export default Label;
