const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>HELLOW GANG</h1>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000....');
});
