import { orders } from '../data/orders.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import { addToCart, updateCartQuantity, buyAgain } from '../data/cart.js';
import { cart, resetCartQuantity } from '../data/cart.js';
import searchBarHTML from './utils/searchBar.js';
import { renderOrderSummary } from './checkout/orderSummary.js';

async function loadPage(){
  await loadProductsFetch();

  document.querySelector('.js-amazon-header')
  .innerHTML = searchBarHTML();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderId = order.id;
    const orderTotal = order.totalCostCents;

    const todaysDate = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order-container"> 
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${todaysDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${formatCurrency(orderTotal)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
     `;
  }); 



  function productsListHTML(order) {

    let productsListHTML = '';

    console.log('order:', order);
    console.log('order products:', order.products);

    // Safety check statement if a products is undefined for some reason
    if (!order.products || !Array.isArray(order.products)) {
      console.error(`Order ${order.id} has no products`);
      return;
    }

    order.products.forEach(productDetails => {
        const product = getProduct(productDetails.productId)
        if (!product) {
          console.error (`Product not found: ${productDetails.productId}`);
          return;
        }
        
        productsListHTML +=` 
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${
                dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
              }
            </div>
            <div class="product-quantity">
              Quantity: ${productDetails.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again"
            data-product-id="${product.id}"
            >
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  // Fix bug to not reset cart if the order has not been placed (so going to a different page like track packagage and going back to view your orders should not reset the cart back to zero).
  // Also update the page to remove orders from the checkout page after order has been placed

  const cartQuantity = resetCartQuantity() || 0;

  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity;



  if (cartQuantity === 0) {
    const container = document.querySelector('.js-cart-item-container');
    if (container) container.remove();
  }



   document.querySelectorAll('.js-buy-again')
    .forEach(button => {
      button.addEventListener('click', () => {
        // const { productId } = button.dataset; 
        buyAgain(button.dataset.productId);
        // addToCart();
        updateCartQuantity();

        button.innerHTML = 'Added';
        setTimeout(() => {
          button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `;
        }, 1000)

      });
    });
}

loadPage();


