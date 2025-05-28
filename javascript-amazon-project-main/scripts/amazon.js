import {cart, addToCart} from  '../data/cart.js';
import {products} from '../data/products.js';//()..)represents the folder outside of the current folder. U can also use {cart as myCart} to rename.

//Amazon data structure (arrays and objects)
 //something that closely matches the data (an array). Since each products has many values we use (an object) that will represent each data.

//Combining all the html together into one string and put it on the web page
let productsHTML = '';

products.forEach((product) => {//Accumulating the result
  productsHTML += `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
              <select class="js-cart-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart
            </button>
      </div>
  `;
});


//Using .toFixed() - will convert a number to string and can tell it how many decimal we want in the bracket.
//Generating the html and using the DOM to put the html on the webpage
document.querySelector('.js-products-grid')
.innerHTML = productsHTML;

function updateCartQuantity() {
//Making cart quantity interactive
    //1. Calculate the quantity
    let cartQuantity = 0;
    
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    
    //2. Put the quantity on the page
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}
//Using addEventListener and DOM querySelectorAll to make the Add to cart button work
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {

  button.addEventListener('click', () => {
    //Data attribute - Allows us to attach any information to an element
  
    const {productId} = button.dataset;//dataset property gives us all the data attribute attached to the button.   
    addToCart(productId);
    updateCartQuantity();
    
  });

});