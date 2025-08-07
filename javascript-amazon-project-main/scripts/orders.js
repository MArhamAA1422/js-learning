import { orders } from "../data/orders.js";
import { products, getProduct } from "../data/products.js";

console.log(orders);

let html = '';

orders.forEach((orderItem) => {
    let orderItemHTML = '<div class="order-container">';
    let headerHTML = `
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderItem.orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${orderItem.totalCostCents}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderItem.id}</div>
          </div>
        </div>
    `;
    let productsHTML = '';
    orderItem.products.forEach((product) => {
        const productItem = getProduct(product.productId);
        console.log(productItem);
        productsHTML += `
            <div class="order-details-grid">
            <div class="product-image-container">
                <img src=${productItem.image}>
            </div>

            <div class="product-details">
                <div class="product-name">
                ${productItem.name}
                </div>
                <div class="product-delivery-date">
                Arriving on: ${product.estimatedDeliveryTime}
                </div>
                <div class="product-quantity">
                Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=123&productId=456">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
                </a>
            </div>
            </div>
        `;
    });

    orderItemHTML += headerHTML;
    orderItemHTML += productsHTML;
    orderItemHTML += '</div>';

    html += orderItemHTML;
});

document.querySelector('.js-orders-grid').innerHTML = html;