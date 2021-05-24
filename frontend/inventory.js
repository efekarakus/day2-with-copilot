const inventory = [
    {
        'productId': '1',
        'quantity': 3,
    },
    {
        'productId': '2',
        'quantity': 2,
    },
    {
        'productId': '3',
        'quantity': 5,
    }
];

const getItem = (productId) => {
    let product = null;
    for (let item of inventory) {
        if (item.productId === productId) {
            product = item;
            break;
        }
    }
    if (product === null) {
        throw new Error(`product id ${productId} does not exist`);
    }
    return product;
}

const updateItem = (productId, delta) => {
    const product = getItem(productId);
    if (product.quantity + delta < 0) {
        throw new Error(`product quantity can not be less than zero`);
    }
    product.quantity += delta;
    return product;
}

exports.inventory = inventory;
exports.getItem = getItem;
exports.updateItem = updateItem;