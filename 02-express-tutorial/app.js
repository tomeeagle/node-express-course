const express = require('express');
const app = express();

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();
}

app.get('/', logger, (req, res) => {
    res.send('Hello World');
});

// About page
app.get('/about', logger, (req, res) => {
    res.send('About page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
