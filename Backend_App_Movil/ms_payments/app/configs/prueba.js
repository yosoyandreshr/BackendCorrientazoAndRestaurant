const express = require('express');
// const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // sandbox or live
  client_id: 'AUntykiw_UUVo5rRtimgpi6-ztncVUFqFUORp_LaGfEuJmSMbiZNvtZEROY6hrQWxrK7gyr4nGXDbe6U',
  client_secret: 'EPrDW9siIZ9RQHsS477U5qbiEdpFfZ1j1fFizFuSguy0ewtdgIf_HtM4KRTcKpEETOJloK2Rpna3gK7g',
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req, res) => {
  const createpaymentjson = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'Red Sox Hat',
          sku: '001',
          price: '25.00',
          currency: 'USD',
          quantity: 1,
        }],
      },
      amount: {
        currency: 'USD',
        total: '25.00',
      },
      description: 'Hat for the best team ever',
    }],
  };

  paypal.payment.create(createpaymentjson, (error, payment) => {
    console.log('pasa');

    if (error) {
      throw error;
    } else {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const { paymentId } = req.query;

  const executepaymentjson = {
    payer_id: payerId,
    transactions: [{
      amount: {
        currency: 'USD',
        total: '25.00',
      },
    }],
  };

  paypal.payment.execute(paymentId, executepaymentjson, (error, payment) => {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send('Success');
    }
  });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(3000, () => console.log('Server Started'));
