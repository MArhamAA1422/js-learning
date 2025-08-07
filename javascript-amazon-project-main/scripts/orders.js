import { orders } from "../data/orders.js";
import { products, getProduct, loadProductsFetch } from "../data/products.js";
import { calculateCartQuantity, addToCartFromOrdersPage } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

console.log(orders);
loadPage();

async function loadPage() {
    await loadProductsFetch();
    renderOrders();
    updateCartQuantity();
}

function renderOrders() {
    let html = '';

    orders.forEach((orderItem) => {
        let orderItemHTML = '<div class="order-container">';
        const date = new Date(orderItem.orderTime);
        let headerHTML = `
            <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${months[date.getMonth()]} ${date.getDate()}</div>
                </div>
                <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItem.totalCostCents)}</div>
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
            const date = new Date(product.estimatedDeliveryTime);
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
                    Arriving on: ${months[date.getMonth()]} ${date.getDate()}
                    </div>
                    <div class="product-quantity">
                    Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-again-button-${product.productId}" data-product-id="${product.productId}">
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

    document.querySelectorAll('.buy-again-button')
        .forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                addToCartFromOrdersPage(productId);
                updateCartQuantity();
            });
        });
}

function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
}