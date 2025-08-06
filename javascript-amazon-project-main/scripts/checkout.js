import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js'

async function loadPage() {
    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);

        // await new Promise(resolve => {
        //     loadCart(() => {
        //         resolve();
        //     });
        // });
        
    } catch (error) {
        console.log(`Unexpected error. Please try again later.`);
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise(resolve => {
        loadCart(() => {
            resolve();
        });
    })

]).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// loadProducts(() => {  // callback
//     loadCart(() => {
//         renderCheckoutHeader();
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });