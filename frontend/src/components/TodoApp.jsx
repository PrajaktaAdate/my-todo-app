import React, { useState, useEffect } from 'react';
import Todo from '../Todo'; 
import { useNavigate } from 'react-router-dom';

function TodoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const navigate = useNavigate();

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  const deleteTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    // If deleting the item being edited, cancel edit
    if (editIndex === index) {
      cancelEdit();
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // Edit logic
  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = () => {
    if (editValue.trim() === '') return;
    const newTodos = [...todos];
    newTodos[editIndex].text = editValue;
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {todos.length === 0 ? (
        <p className="empty">No tasks added yet!</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={`todo ${todo.completed ? 'completed' : ''}`}>  
              {editIndex === index ? (
                <div className="edit-section">
                  <input
                    type="text"
                    aria-label="Edit todo"
                    value={editValue}
                    onChange={handleEditChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    autoFocus
                  />
                  <button className="edit-btn" onClick={saveEdit}>Save</button>
                  <button className="edit-btn" onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <>
                  <span onClick={() => toggleComplete(index)}>{todo.text}</span>
                  <button onClick={() => startEdit(index, todo.text)} aria-label={`Edit ${todo.text}`}>✏️</button>
                  <button className="delete" onClick={() => deleteTask(index)}>❌</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout} className="auth-btn">
        Logout
      </button>
    </div>
  );
}

export default TodoApp;
