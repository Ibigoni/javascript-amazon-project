export let cart = [{//getting the product Id gets all the other information about the product (i.e, name, image, price...)
  productId:
  'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: 
  '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];
//This technique is called "Normalizing the data"

export function addToCart(productId) {
   //Select different quantities

    let addedId;

    const quantitySelector = document.querySelector(`.js-cart-quantity-selector-${productId}`);
    
    const quantity = Number(quantitySelector.value);

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
          added
        });
      }
}


export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  }); 


  cart = newCart;
}