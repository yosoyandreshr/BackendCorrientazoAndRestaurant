const express = require('express');
const log4js = require('log4js');
const morgan = require('morgan');
const cors = require('cors');
const ErrorHandlerMiddleware = require('./app/utils/ErrorHandlerMiddleware');
const routers = require('./app/routes/Route');
const { PREFIX } = require('./app/configs/AppConfig');

const { PORT = 3003 } = process.env;

class SERVER {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start();
    this.logger = log4js.getLogger('ms_menus');
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
      console.log('SERVER ON PORT MS MENU: ', PORT);
    });
  }
}

const server = new SERVER();
module.exports = server.app;
