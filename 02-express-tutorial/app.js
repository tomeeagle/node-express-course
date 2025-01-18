const express = require('express');
const app = express();
const { products } = require('./data');


// Set up home route to return 'Home Page' with a h1 tag styled as open sans
app.get('/', (req, res) => {
    res.send('<h1 style="font-family: sans-serif">Home Page</h1>');
});

// Set up a route to search for a single product by text from the finisterre website
// This will return all the products from the finisterre website https://finisterre.com/products.json
// If the products are not found, it will return 'No products found'
// If the products are found, it will return the products
app.get('/finisterre/products', async (req, res) => {
    const { search } = req.query;
    const data = await fetch('https://finisterre.com/products.json');
    const {products} = await data.json();

    // If a search query is provided, filter the products by the search query
    if (search) {
        const filteredProducts = products.filter((product) => {
            return product.body_html.indexOf(search) !== -1;
        });
        if (filteredProducts.length < 1) {
            return res.status(200).send('<h1>No products found</h1>');
        }
        // If products are found, return the products, with the search term highlighted
        return res.json(filteredProducts);
    }
    // If no search query is provided, return all the products
    if (products.length < 1) {
        return res.status(200).send('<h1>No products found</h1>');
    }
});

// Get users
app.get('/users', async (req, res) => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await users.json();
    console.log(data.length);
    res.json(data);
});

// Set up server for home route
app.get('/users/:userID', async (req, res) => {
    // if the user id > 10, return 'No user with that ID found'
    // if (Number(req.params.userID) > 10) {
    //     return res.status(404).send('<h1>No user with that ID found</h1>');
    // }
    const user = await fetch(
        `https://jsonplaceholder.typicode.com/users/${req.params.userID}`
    );
    const data = await user.json();

    // If the returned object is empty, return 'No user with that ID found', else return the user
    if (Object.keys(data).length === 0) {
        return res.status(404).send('<h1>No user with that ID found</h1>');
    }
    res.json(data);
});

// Set up a route that has a search query and returns all the products with the specified search term
// If no products are found, it will return 'No products matched your search'
// If products are found, it will return the products
app.get('/api/products', (req, res) => {
    const { search } = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.indexOf(search) !== -1;
        });
    }
    if (sortedProducts.length < 1) {
        return res.status(200).send('<h1>No products matched your search</h1>');
    }
    return res.json(sortedProducts);
});

// Set up server for products route
// app.get('/api/products', (req, res) => {
//     const newProducts = products.map((product) => {
//         const { id, name, image } = product;
//         return { id, name, image };
//     });
//     res.json(newProducts);
// });

// Set up server for products/:productID
// This will return the product with the specified ID
// If the product is not found, it will return 'Product not found'
// If the product is found, it will return the product
app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find(
        (product) => product.id === Number(productID)
    );
    if (!singleProduct) {
        return res.status(404).send('<h1>Product not found</h1>');
    }
    return res.json(singleProduct);
});

// Listen on a route with the above URL but also with /reviews/reviewID appended
// This will return the product with the specified ID and the review with the specified ID
// If the product is not found, it will return 'Product not found'
// If the review is not found, it will return 'Review not found'
// If the product and review are found, it will return the product and review
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    const { productID, reviewID } = req.params;
    const singleProduct = products.find(
        (product) => product.id === Number(productID)
    );
    if (!singleProduct) {
        return res.status(404).send('<h1>Product not found</h1>');
    }
    const review = singleProduct.reviews?.find(
        (review) => review.id === Number(reviewID)
    );
    if (!review) {
        return res.status(404).send('<h1>Review not found</h1>');
    }
    return res.json({ singleProduct, review });
});

app.get('/api/v1/query', (req, res) => {
    console.log(req.query);
    const { search, limit } = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: [], message: 'No products matched your search' });
    }
    res.status(200).json(sortedProducts);
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
