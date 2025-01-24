const express = require('express');
const app = express();
const { people } = require('./data');
const fs = require('fs');
const { replaceArrayInFile } = require('./replaceArrayInFile');

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
        return res
            .status(400)
            .json({ success: false, msg: 'Please provide name value' });
    }
    res.status(201).json({ success: true, data: [...people, { name }] });
});

// POST method route
// Create a route to recieve JSON object with a name property
app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'Please provide name value' });
    }
    res.status(201).json({ success: true, person: name });
});

// PUT method route
// Create a route to update the name of a person
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No person with id ${id}` });
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });

    // Get the contents of the file data.js, and replace the people array with newPeople, then write the new data back to the file
    // Example usage
    const filePath = 'data.js';
    const arrayName = 'people';
    const newArray = [...newPeople];

    replaceArrayInFile(filePath, arrayName, newArray)
        .then(() => {
            console.log(
                `Array "${arrayName}" in ${filePath} replaced successfully.`
            );
        })
        .catch((err) => {
            console.error(`Error replacing array in ${filePath}:`, err);
        });

    res.status(200).json({ success: true, data: newPeople });
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
