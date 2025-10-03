 import { orders } from "../data/orders.js";
 import { getProduct, loadProductsFetch } from "../data/products.js";
 import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
 import searchBarHTML from "./utils/searchBar.js";
import { updateCartQuantity } from "../data/cart.js";


 //URL parameters = search parameters, lets us save data directly in the URL

      //Analyzes the URL
      /*
      const url = new URL(window.location.href);

      This will let us get the URL parameters.
      .get() lets us get individual parameter.
      console.log(url.searchParams.get('orderId'));
      console.log(url.searchParams.get('productId'));
      */

async function loadPage(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  const matchingOrderId = orders.find(order => order.id === orderId);
  
  let matchingProductId;

  if (matchingOrderId && Array.isArray(matchingOrderId.products)){//converts products to an array if for some weird reason it isn't with Array.isArray()
    matchingProductId = matchingOrderId.products.find(product => product.productId === productId);

  } else if (matchingOrderId && matchingOrderId.products && matchingOrderId.products.productId === productId) {

    matchingProductId = matchingOrderId.products; 
    
  }

  if (matchingOrderId && matchingProductId) {
    const deliveryDate = dayjs(matchingProductId.estimatedDeliveryTime).format('dddd, MMMM D');
    const product = getProduct(matchingProductId.productId);

    //calculating delivery time
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const orderIdTime = new Date(`${matchingOrderId.orderTime}`);
    const orderTime = orderIdTime.getTime();

    const productIdTime = new Date(`${matchingProductId.estimatedDeliveryTime}`);
    const deliveryTime = productIdTime.getTime();
    
    const updateStatus = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

    // const status = updateStatus.toFixed(2);
    // const deliveryStatus = Math.max(0, Math.min(status, 100));

    console.log(updateStatus);
      

    document.querySelector('.js-amazon-header')
    .innerHTML = searchBarHTML();
  
    // Fix bug to update cart
    document.querySelector('.js-cart-quantity')
    .innerHTML = updateCartQuantity() || 0;
    

    document.querySelector('.js-order-tracking').innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
    
      <div class="delivery-date">
        Arriving on ${deliveryDate}
      </div>
    
      <div class="product-info">
        ${product.name}
      </div>
    
      <div class="product-info">
        Quantity: ${matchingProductId.quantity}
      </div>
    
      <img class="product-image" src="${product.image}">
    
      <div class="progress-labels-container js-progress-label">
      </div>
    
      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar" style="width:${updateStatus}%"></div>
      </div>
    `;

    const progressLabel = document.querySelector('.js-progress-label');

      if (updateStatus && updateStatus <= 49) {
        progressLabel.innerHTML = `
        <div class="progress-label current-status">
          Preparing
        </div>
        <div class="progress-labels">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
        `;
      } else if (updateStatus >= 50 && updateStatus <= 99) {
        progressLabel.innerHTML = `
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-labels current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
        `;
       
      } else if (updateStatus >= 100) {
        progressLabel.innerHTML = `
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-labels">
          Shipped
        </div>
        <div class="progress-label current-status">
          Delivered
        </div>
        `;
      }
      
  } else {
    document.querySelector('.js-order-tracking').innerHTML = `
    <div class="delivery-date">
      Could not find product
    </div>
    `;
  }
}

loadPage();
