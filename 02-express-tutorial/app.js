const express = require('express');
const app = express();
const morgan = require('morgan');
const { people } = require('./data');

// Static assets
app.use(express.static('./methods-public'));

// parse form data
app.use(express.json());

// Routes
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

// Route for /api/postman/people POST
app.post('/api/postman/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' });
    }
    res.status(201).json({ success: true, data: [...people, {name}] });
});

// POST method route
// Create a route to recieve JSON object with a name property
app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' });
    }
    res.status(201).json({ success: true, person: name });
});

// POST login route
app.post('/login', function (req, res) {
    // Get the form data from the request
    const { name } = req.body;

    if (name) return res.send(`<h1>Welcome ${name}</h1>`);
    // If no name is provided, send an error message
    res.status(401).send('Please provide a name');
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
