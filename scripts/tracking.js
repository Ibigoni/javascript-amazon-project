 import { orders } from "../data/orders.js";
 import { getProduct, loadProductsFetch } from "../data/products.js";
 import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


 //URL parameters = search parameters, lets us save data directly in the URL

      //Analyzes the URL
      /*
      const url = new URL(window.location.href);

      This will let us get the URL parameters.
      .get() lets us get individual parameter.
      console.log(url.searchParams.get('orderId'));
      console.log(url.searchParams.get('productId'));
      */

        // const matchingOrderId = order.id;

  // const matchingProductId = order.products.productId;
async function loadPage(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  const matchingOrderId = orders.find(order => order.id === orderId);
  
  let matchingProductId;

  if (matchingOrderId && Array.isArray(matchingOrderId.products)){//converts products to an array if for some weird reason it isn't using Array.isArray()

    matchingProductId = matchingOrderId.products.find(product => product.productId === productId);
  } else if (matchingOrderId && matchingOrderId.products &&      matchingOrderId.products.productId === productId) {
    matchingProductId = matchingOrderId.products; 
  }

  if (matchingOrderId && matchingProductId) {
    const deliveryDate = dayjs(matchingProductId.estimatedDeliveryTime).format('dddd, MMMM D');
    const product = getProduct(matchingProductId.productId);
  
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
    
      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
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
  } else {
    document.querySelector('.js-order-tracking').innerHTML = `
    <div class="delivery-date">
      Could not find product
    </div>`;
  }
}

loadPage();



