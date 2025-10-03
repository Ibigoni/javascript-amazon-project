import {cart, addToCart, calculateCartQuantity, updateCartQuantity} from  '../data/cart.js';//importing multiple variables from the same folder
import {products, loadProducts, loadProductsFetch, renderProducts} from '../data/products.js';//()..)represents the folder outside of the current folder. U can also use {cart as myCart} to rename.
import {formatCurrency } from './utils/money.js'; 
import searchBarHTML from './utils/searchBar.js';

//Amazon data structure (arrays and objects)
 //something that closely matches the data (an array). Since each products has many values we use (an object) that will represent each data.

// loadProducts(renderProductsGrid); // This is a callback function

async function renderProductsGrid() {
 await loadProductsFetch();

 document.querySelector('.js-amazon-header')
 .innerHTML = searchBarHTML();

 document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
  //Combining all the html together into one string and put it on the web page
  

  renderProducts(products);

  // ----------------Search Funcitonality----------------------------------

  const searchButton = document.querySelector('.js-search-button');
  const searchInput = document.querySelector('.js-search-bar');
  
  function handleSearch () {
    const query = searchInput.value.trim().toLowerCase(); //removes unwanted spaces and not case sensitive

    // Update the URL without reloading
    const url = new URL(window.location);
    url.searchParams.set('search', query);
    history.pushState({}, "", url);

    const filteredProducts = products.filter(product =>
      // Using implicit return and make it case in-sensitive
      // Filter products by name or keywords assigned to them
      product.name.toLowerCase().includes(query) ||
      product.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );

    console.log(filteredProducts);
    renderProducts(filteredProducts);
  }

  searchButton.addEventListener('click', handleSearch);

  searchInput.addEventListener('keydown', e => {
    if (e.key == 'Enter') handleSearch();
  });


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
}

renderProductsGrid();
