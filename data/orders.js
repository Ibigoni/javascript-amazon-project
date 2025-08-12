export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder (order) {
  orders.unshift(order);//adds order to the fron tof the array instead of the back
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
