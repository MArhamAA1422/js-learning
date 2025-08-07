import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { orders } from '../data/orders.js';
import { loadProductsFetch, products } from '../data/products.js';
import { calculateCartQuantity } from '../data/cart.js';

async function loadPage() {
    await loadProductsFetch();
    renderTrackingOrder();
}

loadPage();

function getOrderItem(orderId) {
    let matchingItem;
    orders.forEach((orderItem) => {
        if (orderItem.id === orderId) {
            matchingItem = orderItem;
        }
    });
    return matchingItem;
}

function getProductInfo(productId, orderItem) {
    let matchingItem;
    orderItem.products.forEach((productItem) => {
        if (productItem.productId === productId) {
            matchingItem = productItem;
        }
    });
    return matchingItem;
}

function getProductItem(productId) {
    let matchingItem;
    products.forEach((productItem) => {
        if (productItem.id === productId) {
            matchingItem = productItem;
        }
    });
    return matchingItem;
}

function renderTrackingOrder() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    
    const orderItem = getOrderItem(orderId);
    const productItemInOrder = getProductInfo(productId, orderItem);
    const productItem = getProductItem(productId);

    const date = dayjs(productItemInOrder.estimatedDeliveryTime).format('dddd, MMMM DD');

    let html = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${date}
      </div>

      <div class="product-info">
        ${productItem.name}
      </div>

      <div class="product-info">
        Quantity: ${productItemInOrder.quantity}
      </div>

      <img class="product-image" src=${productItem.image}>

      <div class="progress-labels-container">
        <div class="progress-label current-status">
          Preparing
        </div>
        <div class="progress-label">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = html;
}

document.querySelector('.js-cart-quantity').innerHTML = `${calculateCartQuantity()}`;