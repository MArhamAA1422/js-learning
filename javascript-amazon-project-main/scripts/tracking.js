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

    const date = dayjs(productItemInOrder.estimatedDeliveryTime).format('dddd, MMMM D');

    const today = dayjs();
    const orderTime = dayjs(orderItem.orderTime);
    const deliveryTime = dayjs(productItemInOrder.estimatedDeliveryTime);
    const percentageProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  
  // console.log(percentageProgress);
  
    const deliveryMessage = today < deliveryTime ? "Arriving on" : "Delivered on";

    let html = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${deliveryMessage} ${date}
      </div>

      <div class="product-info">
        ${productItem.name}
      </div>

      <div class="product-info">
        Quantity: ${productItemInOrder.quantity}
      </div>

      <img class="product-image" src=${productItem.image}>

      <div class="progress-labels-container">
        <div class="progress-label js-progress-label-preparing">
          Preparing
        </div>
        <div class="progress-label js-progress-label-shipped">
          Shipped
        </div>
        <div class="progress-label js-progress-label-delivered">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percentageProgress}%;"></div>
      </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = html;

    if (percentageProgress < 50) {
        document.querySelector('.js-progress-label-preparing').classList.add('current-status');
    } else if (percentageProgress < 100) {
        document.querySelector('.js-progress-label-shipped').classList.add('current-status');
    } else {
        document.querySelector('.js-progress-label-delivered').classList.add('current-status');
    }
}

document.querySelector('.js-cart-quantity').innerHTML = `${calculateCartQuantity()}`;