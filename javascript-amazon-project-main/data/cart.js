export const cart = [];

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