export const cart = [];
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