const express = require('express');
const app = express();
import chapa from 'chapa';
app.use(express.json());

app.post('/checkout', (req, res) => {
  const { amount, currency, email, firstName, lastName } = req.body;
  const checkoutUrl = 'https://chapa.com/checkout';
  const secretKey = 'your-secret-key';
  const options = {
    amount,
    currency,
    email,
    firstName,
    lastName,
    secretKey,
  };
  chapa.checkout(checkoutUrl, options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});