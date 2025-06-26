import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import renderCheckoutHeader from './checkoutHeader.js';

//Default export:
//Another way of exporting
//We can use when we only want to export 1 thing


// const beforeDate = today.subtract(31, 'days');
// const beforeString = beforeDate.format('MMMM D'); 
// console.log(beforeString);

export function renderOrderSummary() {
  let cartSummaryHTML = '';



  cart.forEach((cartItem) => {
    const {productId} = cartItem; //using destructuring;

    const matchingProduct = getProduct(productId);


    const deliveryOptionId = cartItem.deliveryOptionId;
  
     const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

  cartSummaryHTML += `
  <div class="cart-item-container
  js-cart-item-container
  js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name
                js-product-name">       
              ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity 
                js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}" >${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input
                js-quantity-input-${matchingProduct.id}
                js-quantity-input"
                  data-product-id="${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link 
                js-delete-link-${matchingProduct.id}" 
                data-product-id="${matchingProduct.id}">
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
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceStrings = deliveryOption.priceCents 
      === 0 //ternary operator
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}"
          >
            <input type="radio" 
            ${isChecked ? 'checked': ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceStrings} Shipping
              </div>
            </div>
          </div>
      
      `
    });

    return html;
  }


  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset; //using destructuring
      removeFromCart(productId);

      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`);
      // container.remove();//Every element we get from the DOM has a method called .remove();
      updateCartQuantity(); 
      renderPaymentSummary();
      renderOrderSummary(); 
      renderCheckoutHeader();
    });
  });

  function updateCartQuantity() {
    renderCheckoutHeader();
  }

      document.querySelectorAll('.js-update-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const {productId} = link.dataset; //getting product id by using a data attribute
          const container = document.querySelector(
          `.js-cart-item-container-${productId}`);
          container.classList.add('is-editing-quantity');// Added a class when clicking update button and css styling.
        });
      });

      document.querySelectorAll('.js-save-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const {productId} = link.dataset;

          const container = document.querySelector(
          `.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');

          const quantityInput = document.querySelector(`.js-quantity-input-${productId}`); 

          const newQuantity = Number(quantityInput.value);

          if (newQuantity >= 0 && newQuantity < 1000) {
          updateQuantity(productId, newQuantity);

          // const quantityLabel = document.querySelector(
          //   `.js-quantity-label-${productId}`
          // ); 
          //   quantityLabel.innerHTML = newQuantity
          //   updateCartQuantity();
          } else if (newQuantity < 0 ) {
            alert('Not a valid quantity');
          }

          renderCheckoutHeader();
          renderOrderSummary();
          renderPaymentSummary();

        });


      });
      
    document.querySelectorAll('.js-quantity-input')
    .forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const { productId } = input.dataset;

        
          const container = document.querySelector(
          `.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');


          const newQuantity = Number(input.value);

          if (newQuantity >= 0 && newQuantity < 1000) {
          updateQuantity(productId, newQuantity);

          const quantityLabel = document.querySelector(
            `.js-quantity-label-${productId}`
          ); 
            quantityLabel.innerHTML = newQuantity;
            updateCartQuantity();
          } else if (newQuantity < 0 ) {
            alert('Not a valid quantity');
          }
        }
        renderPaymentSummary();

      });
    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}