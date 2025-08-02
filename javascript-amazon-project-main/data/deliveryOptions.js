import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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
    
    deliveryOptions.forEach(option => {
        if (deliveryOptionId === option.id) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
        
    const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
    );
    
    let dateString = deliveryDate.format(
        'dddd, MMMM D'
    );

    if (dateString[0] === 'F') {
        const deliveryDate = today.add(
            deliveryOption.deliveryDays+2, 'days'
        );
        
        dateString = deliveryDate.format(
            'dddd, MMMM D'
        );
    }

    if (dateString[0] === 'S' && dateString[1] === 'a') {
        const deliveryDate = today.add(
            deliveryOption.deliveryDays+1, 'days'
        );
        
        dateString = deliveryDate.format(
            'dddd, MMMM D'
        );
    }

    return dateString;
}