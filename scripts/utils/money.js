export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
} //this function will be shared between checkout.js and amazon.js


//with this we wont need {} when importing the name. However, each file can only have ` default export.
export default formatCurrency;