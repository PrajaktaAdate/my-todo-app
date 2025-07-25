const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage
let todos = [];
let nextId = 1;

// Hardcoded user
const USER = { email: 'test@task.com', password: 'task@123', token: 'mock-token' };

// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === USER.email && password === USER.password) {
    return res.json({ token: USER.token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Auth middleware (simple token check)
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader === `Bearer ${USER.token}`) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

// GET /items
app.get('/items', auth, (req, res) => {
  res.json(todos);
});

// POST /items
app.post('/items', auth, (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required' });
  }
  const newTodo = { id: nextId++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /items/:id
app.put('/items/:id', auth, (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  if (typeof text === 'string') todo.text = text;
  if (typeof completed === 'boolean') todo.completed = completed;
  res.json(todo);
});

// DELETE /items/:id
app.delete('/items/:id', auth, (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex(t => t.id === parseInt(id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = todos.splice(idx, 1)[0];
  res.json(deleted);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
}); 