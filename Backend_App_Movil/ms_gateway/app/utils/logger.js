const log4js = require('log4js');
const uuid = require('uuid');

const { env } = process;
const {
  LOG_LEVEL = 'trace',
} = env;

log4js.configure({
  appenders: {
    console: { type: 'console', layout: { type: 'colored' } },
  },
  categories: {
    default: { appenders: ['console'], level: LOG_LEVEL },
  },
  replaceConsole: true,
});

log4js.getLoggerWithId = (logName) => {
  const transactionId = uuid();

  return log4js.getLogger(`[${logName}] ${transactionId}`);
};

module.exports = log4js;
