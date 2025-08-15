import {calculateCartQuantity, cart, updateQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';


export function renderPaymentSummary() {
let productPriceCents = 0;
let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    // safety check
    // if (!product) {
    //   //Handle missing product (optional: log, skip, or throw)
    //   return;
    // }
    productPriceCents += product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents
  });

 const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
 const taxCents = totalBeforeTaxCents * 0.1;
 const totalCents = totalBeforeTaxCents + taxCents;

 const paymentSummaryHTML = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
      </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
 `;

 document.querySelector('.js-payment-summary')
 .innerHTML = paymentSummaryHTML;

 document.querySelector('.js-place-order')
  .addEventListener('click', async () => {//Making this an async function because we need to wait for the response to come back (backend).fetch returns a promise 
    //sending data to the backend using POST. Need to give fetch and param which is an object
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', { //waits for fetch to finish before moving on to next line.
        method: 'POST', //type of request
        headers: {//gives the backend more information about the request
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({//we can't send an object directly. We need to convert it into a JSON string by using JSON.stringify
          cart: cart
        })
      });

      const order = await response.json(); //response.json() is also a promise so we need to use await before going to the next line
      console.log(addOrder(order));

    } catch (error) {
      console.log('Unexpected error. Try again later.')
    }

    //changes the url at the top of the browser  
    window.location.href = 'orders.html';
  });


  /**NOTE: WE CAN ONLY USE AWAIT INSIDE AN ASYNC FUNCTION**/

  //Here we send an http request to the backend to create the order
}
