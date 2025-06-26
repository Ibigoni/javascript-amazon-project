import formatCurrency from '../../scripts/utils/money.js';

//Automated testing
//Testing different test cases (basic and edge test case)
//Test suite - a group of related test code
console.log('test suite: formatCurrecncy');

console.log('converts cents into dollars');//naming convention that describes what the test code is doing

if (formatCurrency(2095) === '20.95' ) {//basic test case
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

if (formatCurrency(0) === '0.00') {//edge case testing
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {//edge case testing (if it rounds up correctly)
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds down to the nearest cent');

if(formatCurrency(2000.4) === '20.00') {//edge case testing (if it rounds down correctly)
  console.log('passed');
} else {
  console.log('failed'); 
}

console.log('rounding negative number')
if (formatCurrency(-2000.5) === '-20.00' ) {
  console.log('passed');
} else {
  console.log('failed');
}

if (formatCurrency(-2999.5) === '-29.99') {
  console.log('passed');
} else {
  console.log('failed');
}
