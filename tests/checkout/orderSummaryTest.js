import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from '../../data/cart.js';
import {loadProducts, loadProductsFetch} from '../../data/products.js'


describe('test suit: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  //Runs before all the test
  //Use done() when testing backend. This can be used in beforeEach, and it as well.
  beforeAll((done) => {//done is a function provided by jasmine. When added beforeAll won't go to the next step until done is called again.
  //done() lets us control when to go to the next step
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
     spyOn(localStorage, 'setItem');
  
      document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
      `;
  
      spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([{
            productId:
            productId1,
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productId: 
            productId2,
            quantity: 1,
            deliveryOptionId: '2'
          }]);
        });
        loadFromStorage();
  
        renderOrderSummary();
  });
  afterEach(() => {
    //document.querySelector('.js-test-container').innerHTML = ``;
  });


  it('displays the cart', () => {
      expect(
        document.querySelectorAll('.js-cart-item-container').length
      ).toEqual(2);
      expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain('Quantity: 2')
      expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain('Quantity: 1')
      expect(
        document.querySelector('.js-product-name').innerText
      ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
  });

  it('removes a product', () => {
      document.querySelector(`.js-delete-link-${productId1}`).click();
      expect(
        document.querySelectorAll('.js-cart-item-container').length
      ).toEqual(1);
      expect(
        document.querySelector(`.js-cart-item-container-${productId1}`)
      ).toEqual(null);
      expect(
        document.querySelector(`.js-cart-item-container-${productId2}`)
      ).not.toEqual(null);
      expect(cart.length).toEqual(1);//the cart length is correct
      expect(cart[0].productId).toEqual(productId2);//the product Id is correct
      expect(
        document.querySelector('.js-product-name').innerText
      ).toContain('Intermediate Size Basketball');
  });
});