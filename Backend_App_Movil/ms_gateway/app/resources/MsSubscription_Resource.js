 MsSubscriptionResource = module.exports;
 const HTTPClient = require('../utils/HTTPClient');

 const {
     MICROSERVICE_URL = 'http://localhost:3005'
 } = process.env;

 const BASE_URL = `${MICROSERVICE_URL}/api/ms-subscriptions`;

 MsSubscriptionResource.createPackage = body =>
     HTTPClient.post(`${BASE_URL}/packages`, body);

 MsSubscriptionResource.createSubscription = body =>
     HTTPClient.post(`${BASE_URL}/subs`, body);

 MsSubscriptionResource.getSubsByRestaurant = restId =>
     HTTPClient.get(`${BASE_URL}/subs/getByRestaurant/${restId}`);

 MsSubscriptionResource.getBalance = subId =>
     HTTPClient.get(`${BASE_URL}/Subs/getBalance/${subId}`);

 MsSubscriptionResource.getSubsByUser = userId =>
     HTTPClient.get(`${BASE_URL}/subs/getByUser/${userId}`);

 MsSubscriptionResource.getOneSubscription = subId =>
     HTTPClient.get(`${BASE_URL}/subs/getOne/${subId}`);

 MsSubscriptionResource.getOnePackage = packageId =>
     HTTPClient.get(`${BASE_URL}/packages/getOne/${packageId}`);

 MsSubscriptionResource.getPacksByRestaurant = restId =>
     HTTPClient.get(`${BASE_URL}/packages/getPacksByRestaurant/${restId}`);

 MsSubscriptionResource.updateBalance = (subId, body) =>
     HTTPClient.put(`${BASE_URL}/Subs/updateBalance/${subId}`, body);

 MsSubscriptionResource.updatePackage = (packageid, body) =>
     HTTPClient.put(`${BASE_URL}/packages/updatePackage/${packageid}`, body);