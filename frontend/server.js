const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 3000;
const Orders = require('./orders');

app.get('/_healthcheck', (req, res) => {
    res.sendStatus(200);
});

app.all(['/products', '/products/*'], async (req, res) => {
    console.log(`forward request to backend service  http://backend.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000${req.path}`);
    const response = await axios({
        method: req.method,
        url: `http://backend.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000${req.path}`,
        headers: req.headers,
    });
    res.json(response.data);
});

app.all(['/inventory', '/inventory/*'], async (req, res) => {
    console.log(`forward request to backend service  http://backend.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000${req.path}`);
    const response = await axios({
        method: req.method,
        url: `http://backend.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000${req.path}`,
        headers: req.headers,
    });
    res.json(response.data);
});

app.get('/orders', (req, res) => {
    res.send(Orders.orders);
});

app.post('/orders', async (req, res) => {
    console.log(`create order ${JSON.stringify(req.body)}`);
    try {
        const {requester, productId} = req.body;
        const response = await axios({
            method: 'POST',
            url: `http://backend.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}:3000/inventory`,
            headers: req.headers,
            data: {
                productId,
                quantity: -1,
            },
        });
        const record = Orders.createOrder(requester, productId);
        res.json(record);
    } catch(err) {
        res.status(404).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Frontend listening at ${port}`)
});