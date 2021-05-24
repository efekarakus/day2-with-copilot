const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const Products = require('./products');
const Inventory = require('./inventory');

app.get('/_healthcheck', (req, res) => {
    res.sendStatus(200);
});

app.get(['/products', '/products/'], (req, res) => {
    console.log(`get all products`);
    const data = Products.products.map(p => {
        return {
            id: p.id,
            name: p.name,
        };
    });
    res.json(data);
});

app.get('/products/:productId', (req, res) => {
    console.log(`get product details for id ${req.params.productId}`);
    const productId = req.params.productId;
    for (let product of Products.products) {
        if (product.id === productId) {
            res.json(product)
            return;
        }
    }
    res.sendStatus(404);
});

app.get(['/inventory', 'inventory/'], (req, res) => {
    console.log(`get all inventory`);
    res.json(Inventory.inventory);
});

app.get('/inventory/:productId', (req, res) => {
    console.log(`get inventory for item ${req.params.productId}`);
    try {
        res.json(Inventory.getItem(req.params.productId));
    } catch(err) {
        res.status(404).send(err.message);
    }
});

app.post(['/inventory', '/inventory/'], (req, res) => {
    console.log(`update inventory ${JSON.stringify(req.body)}`);
    try {
        const {productId, quantity } = req.body;
        const product = Inventory.updateItem(productId, quantity);
        res.json(product);
    } catch(err) {
        res.status(404).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Backend listening at ${port}`)
});