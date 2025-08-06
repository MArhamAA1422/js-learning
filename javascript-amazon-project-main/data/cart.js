export let cart;

loadFromStorage();  // Hoisting

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

let currentTimeoutIdList = {};

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
            quantity: selectedAmount,
            deliveryOptionId: '1'
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

    saveToStorage();
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            return;
        }
        newCart.push(cartItem);
    });
    
    cart = newCart;

    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        }
    });

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach(item => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    // console.log(xhr.response);
      console.log('load cart');

    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    console.log('load cart');

    const text = response.text();
    console.log(text);
}