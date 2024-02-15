import React from 'react';
import './button.css';

function Button({ classes, value }) {
  return <button className={classes}>{value}</button>;
}
export default Button;
