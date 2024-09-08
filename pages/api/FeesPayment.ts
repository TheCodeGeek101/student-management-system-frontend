import paychangu from '@api/paychangu';

paychangu.auth('Bearer SEC-JN3J9tcfHAh1942pK1CCKOjdz1Rz0ez0');

paychangu.levelReference({
  amount: '10000', // Numeric string representing the transaction amount
  currency: 'MWK', // Malawian Kwacha
  tx_ref: 'TX123456789', // A unique transaction reference
  first_name: 'John', // User's first name
  last_name: 'Doe', // User's last name
  callback_url: 'https://example.com/callback', // URL to receive transaction updates
  return_url: 'https://example.com/return', // URL to return after payment
  email: 'john.doe@example.com', // User's email
  meta: 'order_98765', // Meta information, e.g., order ID
  uuid: 'b28e433e-5f64-4f77-8c5e-66df0d50c7b1', // A unique identifier
  customization: {
    title: 'Payment for Order 98765', // Custom title
    description: 'Payment for electronics purchased' // Custom description
  }
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
