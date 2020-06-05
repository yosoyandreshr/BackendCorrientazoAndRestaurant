const express = require('express');
const log4js = require('log4js');
const morgan = require('morgan');
const cors = require('cors');
const routers = require('./app/routes');
const { PREFIX } = require('./app/config/AppConfig');

const { PORT = 3008 } = process.env;

class SERVER {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start();
    this.logger = log4js.getLogger('ms_notifications');
  }

  config() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(PREFIX, routers);
    this.app.use(cors());
  }

  start() {
    this.app.listen(PORT, () => {
      console.log('SERVER ON PORT MS NOTIFICATION:', PORT);
    });
  }
}

const server = new SERVER();
module.exports = server.app;
