export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
} //this function will be shared between checkout.js and amazon.js