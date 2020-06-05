const MsPaymentManager = module.exports;
const MsPaymentResource = require('../resources/MsPayment_Resource');

MsPaymentManager.create = async (body, logger) => {
     const{sku, ...payment} = body;
     const pay ={ sku, ...payment};
     return MsPaymentResource.create(pay,logger);
}

MsPaymentManager.success = async (body, logger) => {
     const { url } = body;
     const success= await MsPaymentResource.success(url,logger).catch(() => undefined);

     return success;
};