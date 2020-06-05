const sendNotificaion = module.exports;
const Notifications = require('node-gcm');

sendNotificaion.send = async (token) => {
  const sender = new Notifications.Sender('AIzaSyBZE982uI7sOsNh2fnID4yGvoT0GIcekwE');
  const message = new Notifications.Message({
    notification: {
      title: ' El proceso de tu orden ha cambiado',
      body: 'verifica tu pedido',
    },
    data: {
      cosa: 'orden obtenida!!!',
    },
  });

  const regstokens = [];

  regstokens.push(`${token}`);

  sender.send(message, { registrationTokens: regstokens }, (err, response) => {
    if (err) console.error(err);
    else console.log(response);
  });
};
