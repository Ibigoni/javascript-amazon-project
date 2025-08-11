import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import renderCheckoutHeader from './checkout/checkoutHeader.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

// Promise is a class that takes in a callback function
// Promise lets us have as many steps as we want and we can use "resolve()" to wait for each step to finish before going to the next step

Promise.all([//promise.all handles an array of promises
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
    console.log(values); //this will give us an array of values inside of resolve('value1') param.

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');//similar to the done() function which lets us control when to go to the next step
    //'value1'- resolve can take in a param value that can be accessed by .then
  });

}).then((value) => {
  console.log(value); //this is displaying the value inside of resolve. This shows that values are shareable between two steps of a promise.

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});
*/


/*
//this is a callback code
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/

