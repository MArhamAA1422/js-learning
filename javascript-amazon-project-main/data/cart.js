export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

let currentTimeoutIdList = {};

export function addToCart(productId) {
    let matchingItem;

    cart.forEach(item => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });

    let selectedAmount = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    if (matchingItem) {
        matchingItem.quantity += selectedAmount;
    } else {
        cart.push({
            productId,
            quantity: selectedAmount
        });
    }

    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('show-added-to-cart');

    let previousTimeoutId = currentTimeoutIdList[productId];

    if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
    }

    let currentTimeoutId = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('show-added-to-cart');
    }, 2000);

    currentTimeoutIdList[productId] = currentTimeoutId;
}

export function removeFromCart(productId) {
    let deleteCart;
    cart.forEach((cartItem) => {
        if (cartItem.id === productId) {
            deleteCart = cartItem;
        }
    });
    cart.splice(deleteCart, 1);
}