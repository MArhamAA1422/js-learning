import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let cartSummary = '';

function updateCartQuantity() {
    document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()}`;
}

updateCartQuantity();

cart.forEach(cartItem => {
    const productId = cartItem.productId;
    let matchingProduct;  // normalizing the data: finding other info with one

    products.forEach((product) => {
        if (productId === product.id) {
            matchingProduct = product;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach(option => {
        if (deliveryOptionId === option.id) {
            deliveryOption = option;
        }
    });

    const today = dayjs();
        
    const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
    );
    
    const dateString = deliveryDate.format(
        'dddd, MMMM D'
    );

    cartSummary += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label remove-quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
    `
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach(deliveryOption => {
        const today = dayjs();
        
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryOption.priceCents)}`;
        
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            
        html += `
        <div class="delivery-option">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
            </div>
        </div>
        `
    });

    return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummary;

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        updateCartQuantity();
    });
});

document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-quantity').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

        if (document.querySelector(`.js-quantity-input-${productId}`).value.length === 0) return;

        let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Invalid quantity, it must be between 0 and 999.');
            return;
        }

        updateQuantity(productId, newQuantity);
        updateCartQuantity();

        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${newQuantity}`;
    });
});

document.querySelectorAll('.js-quantity-input').forEach(link => {
    link.addEventListener('keydown', (event) => {
        const productId = link.dataset.productId;
        if (event.key === 'Enter') {
            let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
            // console.log(newQuantity);

            document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

            if (newQuantity < 0 || newQuantity >= 1000) {
                alert('Invalid quantity, it must be between 0 and 999.');
                return;
            }

            updateQuantity(productId, newQuantity);
            updateCartQuantity();

            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${newQuantity}`;
        }
    });
});