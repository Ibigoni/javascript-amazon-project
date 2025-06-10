import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function isWeekend(date) {

const today = dayjs();
const todayDate = today.add(date, 'days');
const dateString = todayDate.format('dddd');

let displayWeekend = dateString === 'Saturday' || dateString === 'Sunday' 
?  `It is the weekend because it is ${dateString}`
: `It is not the weeked(${dateString})`

// if (dateString === 'Saturday' || dateString === 'Sunday' ){
//   check = true;
//   return `It is the weekend because it is ${dateString}`
// } else {
//   check;
//   return `It is not the weeked(${dateString})`
// }

return displayWeekend;

}

export default isWeekend;