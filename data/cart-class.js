//CLASSES//Object Oriented Programming - Group all data and functions into an object

class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
  //Give variable from the cart class instances
  this.localStorageKey = localStorageKey;

  //running a function from the class
  this.loadFromStorage();
  }

  loadFromStorage() {//: function() {shorthand Method Syntax
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));//takes one string (name of what we saved earlier). Convert to regular string
          //if there no item in localstorage it will result to null so there need to be a default value attached as shown below.
  
          if (!this.cartItems) {
            this.cartItems = 
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
  saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));//takes two item. the name of the variable we want to save and the string(convert using JSON.stringify(variablename)).
  }

  addToCart(productId) {
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
        
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
        
        if (matchingItem) {
          matchingItem.quantity += quantity;
        } else {
          this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
          });
        }
        

        this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    }); 


    this.cartItems = newCart;

    this.saveToStorage();
  }

  calculateCartQuantity() {
    //Making cart quantity interactive
      //1. Calculate the quantity
      let cartQuantity = 0;
      
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
      let matchingId;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingId = cartItem;
        }
      });

      if (matchingId){
        matchingId.quantity = newQuantity;
      }
      this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
        
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.deliveryOptionId = deliveryOptionId
    
      this.saveToStorage();
    }
  }
}

//creating new classes of the cart class
const cart = new Cart('cart-oop'); 
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);









