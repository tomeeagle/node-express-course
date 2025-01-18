const express = require('express');
const path = require('path');
const app = express();

// app.get('/', (req, res) => {
//     // Return the index.html file from the ./public folder
//     res.sendFile(path.resolve(__dirname, './public/index.html'));
// });

// // Routes for about, projects and contact pages
// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './public/about.html'));
// });

// app.get('/projects', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './public/projects.html'));
// });

// app.get('/contact', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './public/contact.html'));
// });

// Make sure we also return the css and js files requested by the index.html file
app.use(express.static('./public'));

app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
