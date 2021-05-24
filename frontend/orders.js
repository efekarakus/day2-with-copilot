let lastOrderId = 1;
const orders = [];

const createOrder = (requester, productId) => {
    lastOrderId += 1;
    const order = {
        id: `${lastOrderId}`,
        details: {
            requester: requester,
            productId: productId,
        },
    };
    orders.push(order);
    return order;
}

exports.orders = orders;
exports.createOrder = createOrder;