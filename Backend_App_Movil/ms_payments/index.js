const express = require('express');
const log4js = require('log4js');
const morgan = require('morgan');
const cors = require('cors');
const routers = require('./app/routes/router');
const ErrorHandlerMiddleware = require('./app/utils/ErrorHandlerMiddleware');
const { PREFIX } = require('./app/configs/AppConfig');

const { PORT = 3006 } = process.env;

class SERVER {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start();
    this.logger = log4js.getLogger('ms_payments');
  }

  config() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(PREFIX, routers);
    this.app.use(cors());
    this.app.use(ErrorHandlerMiddleware.MainHandler);
  }

  start() {
    this.app.listen(PORT, () => {
      console.log('SERVER ON PORT MS PAYMENT: ', PORT);
    });
  }
}

const server = new SERVER();
module.exports = server.app;
