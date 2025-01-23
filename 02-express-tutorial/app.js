const express = require('express');
const app = express();
const morgan = require('morgan');
const { logger, logging } = require('./logger');
const authorize = require('./authorize');

// Apply middleware
// app.use(logger); 
// app.use(logging); 
// app.use(authorize);
app.use(morgan('tiny'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api', (req, res) => {
  res.send('API page');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});