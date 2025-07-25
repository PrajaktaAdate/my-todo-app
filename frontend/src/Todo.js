import React from 'react';

function Todo({ todo, index, deleteTask, toggleComplete }) {
  return (
    <li className={`todo ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleComplete(index)}>{todo.text}</span>
      <button className="delete" onClick={() => deleteTask(index)}>❌</button>
    </li>
  );
}

export default Todo;