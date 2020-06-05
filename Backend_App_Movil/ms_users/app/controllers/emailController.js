const emailController = module.exports;
const nodemailer = require('nodemailer');


emailController.sendEmail = function (req, res) {
  const { body } = req;
  const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
      user: 'caseritosTeam@hotmail.com',
      pass: 'caseritos2020',
    },
  });
  const mailOptions = {
    from: 'caseritosTeam@hotmail.com',
    to: body.email,
    subject: 'Envíe sus documentos y lo contactaremos',
    text: 'Para ser vendedor debe enviar los siguientes documentos al correo : caseritosTeam@hotmail.com'
    + '\n* Nombre completo del propietario'
    + '\n* Nombre completo del propietario'
    + '\n* Scanner del documento del propietario'
    + '\n* Nombre del restaurante'
    + '\n* Slogan del restaurante'
    + '\n* Dirección y teléfono del restaurante'
    + '\n* Fotografia del restaurante'
    + '\n* Horarios de atención'
    + '\n* Scanner del RUT'
    + '\n* Scanner de la cámara de comercio'
    + '\n* Scanner del certificado de sanidad y salubridad',
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      res.send(500, error.message);
    } else {
      console.log('Correo Electrónico enviado');
      res.status(200).jsonp(req.body);
    }
  });
};

emailController.sendEmailPassword = (email, password) => {
  const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
      user: 'caseritosTeam@hotmail.com',
      pass: 'caseritos2020',
    },
  });
  const mailOptions = {
    from: 'caseritosTeam@hotmail.com',
    to: email,
    subject: 'Restablecimiento de Contraseña',
    text: `${'Su nueva contraseña es :'
    + '\n'}${password}\nNo olvide cambiarla cuando inicie sesión`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo Electrónico enviado');
    }
  });
};
