import {cart, calculateCartQuantity} from '../../data/cart.js';

export function renderCheckoutHeader() {
 let checkoutHTML;
 
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
    
  checkoutHTML = `
     <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="amazon.html"></a>)
        </div>
    `

}


export default renderCheckoutHeader;