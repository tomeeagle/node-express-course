const http = require('http');
const { readFileSync } = require('fs');
const path = require('path');

// Get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const { people, products } = require('./data');

const server = http.createServer((req, res) => {
    const { url } = req;

    console.log(req.url);

    if (url === '/products') {
        res.writeHead(200, { 'content-type': 'text/html' });
        products?.forEach((product) => {
            res.write(`<div>${product.name}</div>`);
            res.write(`<div>${product.price}</div>`);
            res.write(`<div>${product.desc}</div>`);
            res.write(`<img src="${product.image}" alt="${product.name}" />`);
        });
        res.end();
    } else if (url === '/people') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.write(JSON.stringify(people));
        res.end();
    } else if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(homePage);
        res.end();
    } else if (url === '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' });
        res.write(homeStyles);
        res.end();
    } else if (url === '/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' });
        res.write(homeImage);
        res.end();
    } else if (url === '/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' });
        res.write(homeLogic);
        res.end();
    }
});

server.listen(3000);
