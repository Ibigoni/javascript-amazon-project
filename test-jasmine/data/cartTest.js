import { addToCart, cart, loadFromStorage } from '../../data/cart.js';
document.body.innerHTML = `
  <select class="js-cart-quantity-selector-test-product-id">
    <option value="1" selected>1</option>
  </select>
  <div class="js-added-to-cart-test-product-id"></div>
`;

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'test-product-id',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('test-product-id');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('test-product-id');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('test-product-id');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('test-product-id');
    expect(cart[0].quantity).toEqual(1);
  });
});