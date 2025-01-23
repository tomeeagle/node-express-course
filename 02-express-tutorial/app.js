const express = require('express');
const app = express();
const morgan = require('morgan');
const { people } = require('./data');

// Static assets
app.use(express.static('./methods-public'));
app.use(morgan('tiny'));

// parse form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

// Route for

// POST method route
app.post('/api/people', function (req, res) {
    console.log('BODY', req.body);
    res.json({
        message: 'POST request to the homepage',
        data: people
    });
});

// POST login route
app.post('/login', function (req, res) {
    // Get the form data from the request
    const { name } = req.body;

    if (name) res.send(`<h1>Welcome ${name}</h1>`);
    // If no name is provided, send an error message
    res.status(401).send('Please provide a name');


     

});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
