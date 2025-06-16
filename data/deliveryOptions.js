export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const newDeliveryDays = skipWeekendDays(deliveryOption.deliveryDays)
  const deliveryDate = today.add(newDeliveryDays, 'd')
  const datestring = deliveryDate.format('dddd, MMMM D')

  return datestring
}

function skipWeekendDays(deliveryDays) {
  const today = dayjs();
  for (let i = 1; i <= deliveryDays; i++) {
    const weekDay = today.add(i, 'd').format('dddd')
    if (weekDay === 'Saturday' || weekDay === 'Sunday') {
      deliveryDays++
    }
  }
  return deliveryDays
}