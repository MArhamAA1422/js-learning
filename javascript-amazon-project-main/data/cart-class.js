class Cart {
    cartItems;  // by default 'undefined'
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

        if (!this.cartItems) this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }

    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
        let currentTimeoutIdList = {};

        this.cartItems.forEach(item => {
            if (item.productId === productId) {
                matchingItem = item;
            }
        });

        // let selectedAmount = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        let selectedAmount = 1;

        if (matchingItem) {
            matchingItem.quantity += selectedAmount;
        } else {
            this.cartItems.push({
                productId,
                quantity: selectedAmount,
                deliveryOptionId: '1'
            });
        }

        // document.querySelector(`.js-added-to-cart-${productId}`).classList.add('show-added-to-cart');

        let previousTimeoutId = currentTimeoutIdList[productId];

        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }

        let currentTimeoutId = setTimeout(() => {
            document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('show-added-to-cart');
        }, 2000);

        currentTimeoutIdList[productId] = currentTimeoutId;

        this.saveToStorage();
    }

    removeFromCart(productId) {
        let newCartItems = [];
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                return;
            }
            newCartItems.push(cartItem);
        });
        
        this.cartItems = newCartItems;

        this.saveToStorage();
    }

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = newQuantity;
            }
        });

        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach(item => {
            if (item.productId === productId) {
                matchingItem = item;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart, businessCart);

console.log(businessCart instanceof Cart);