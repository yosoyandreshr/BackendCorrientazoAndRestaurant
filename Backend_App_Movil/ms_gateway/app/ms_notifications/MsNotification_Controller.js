const MsNotificationController = module.exports;
const { BaseError } = require('../utils/ErrorHandlerMiddleware');
const MsNotificationResources = require('../resources/MsNotifications_Resource');

MsNotificationController.saveTokenDevice = async (req, res, next) => {

    const logName = 'SaveTokenDevice: ';
    const logger = req.log || console
    const { body } = req;
    logger.info(`Starts userController.save: params ${JSON.stringify(body)}`);

    MsNotificationResources.saveTokenDevice(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
}

MsNotificationController.updateTokenDevice = async (req, res, next) => {
    const logName = 'SaveTokenDevice: ';
    const logger = req.log || console;
    const { body } = req;
    const { id } = req.params;

    MsNotificationResources.updateTokenDevice(id, body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));
}

MsNotificationController.sendToken = async (req, res, next) => {
    const logName = 'Send Token Device: ';
    const logger = req.log || console;
    const { id } = req.params;

    MsNotificationResources.getTokenDevice(id, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.message)));

}