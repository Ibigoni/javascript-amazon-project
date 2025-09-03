//Procedural Programming
export let cart;

loadFromStorage();

export function loadFromStorage() {
 cart = JSON.parse(localStorage.getItem('cart'));//takes one string (name of what we saved earlier). Convert to regular string

  //if there no item in localstorage it will result to null so there need to be a default value attached as shown below.

  if (!cart) {
    cart = 
    [{//getting the product Id gets all the other information about the product (i.e, name, image, price...)
      productId:
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: 
      '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
    //This technique is called "Normalizing the data"
  }
}

//Using localStorage to save the cart from reseting when refreshing the webpage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));//takes two item. the name of the variable we want to save and the string(convert using JSON.stringify(variablename)).
}

export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-cart-quantity-selector-${productId}`);
    
  const quantity = Number(quantitySelector.value);
  //Select different quantities
    let addedId;

    //show added after clicking add to cart button
    const added = document.querySelector(`.js-added-to-cart-${productId}`);
    
    added.classList.add('message');
    
    //Check if a previous timeoutId exists. if it does,
    //we will stop it
    if (addedId){
    clearTimeout(addedId);
    }

     const timeoutId = setTimeout(() => {
      added.classList.remove('message');
    }, 2000)
    
    //Save the timeoutId so we can stop it later
    addedId = timeoutId;

  let matchingItem;
      
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
      saveToStorage();
}

export function buyAgain(productId) {
  let matchingItem;
  const quantity = 1;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}


export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  }); 


  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  //Making cart quantity interactive
    //1. Calculate the quantity
    let cartQuantity = 0;
    
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function resetCartQuantity() {
    cart.forEach(cartItem => {
      cartItem.quantity = 0;
    });
    saveToStorage();
  }

export function updateCartQuantity() {
  //Making cart quantity interactive
  const cartQuantity = calculateCartQuantity();

  if (cartQuantity === 0) {
    document.querySelector('.js-cart-quantity')
    .innerHTML = '';
  } else {
    //2. Put the quantity on the page
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  }
}

export function updateQuantity(productId, newQuantity) {
  let matchingId;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingId = cartItem;
    }
  });

  if (matchingId){
    matchingId.quantity = newQuantity;
  }
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
      
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.deliveryOptionId = deliveryOptionId
  
    saveToStorage();
  }
}

export async function loadCartFetch () {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const someText = await response.text();

  console.log(someText);
}


export function loadCart (fun) {//this param contains a funciton
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    fun();
  });

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}
  

