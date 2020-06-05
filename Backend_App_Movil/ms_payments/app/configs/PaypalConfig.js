const PaypalConfig = require('paypal-rest-sdk');

PaypalConfig.configure({
  mode: 'sandbox',
  client_id: 'AUntykiw_UUVo5rRtimgpi6-ztncVUFqFUORp_LaGfEuJmSMbiZNvtZEROY6hrQWxrK7gyr4nGXDbe6U',
  client_secret: 'EPrDW9siIZ9RQHsS477U5qbiEdpFfZ1j1fFizFuSguy0ewtdgIf_HtM4KRTcKpEETOJloK2Rpna3gK7g',
});

module.exports = PaypalConfig;
