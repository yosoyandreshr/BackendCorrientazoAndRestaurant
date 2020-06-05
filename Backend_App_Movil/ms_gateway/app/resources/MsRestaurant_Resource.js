const MsRestaurantResource = module.exports;
const HTTPClient = require('../utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:3002' } = process.env;

const BASE_URL = `${MICROSERVICE_URL}/api/ms-restaurants`;

MsRestaurantResource.login = body =>
HTTPClient.post(`${BASE_URL}/login`, body);

MsRestaurantResource.save = body =>
HTTPClient.post(`${BASE_URL}/Restaurant`,body);

MsRestaurantResource.getUserbyauthId = id =>
HTTPClient.get(`${BASE_URL}/restaurant/auth/${id}`);

MsRestaurantResource.getRestaurant = body =>
    HTTPClient.get(`${BASE_URL}/restaurant`, body);

MsRestaurantResource.getRestaurantByCity = city =>
    HTTPClient.get(`${BASE_URL}/Restaurant/findByCity/${city}`);

MsRestaurantResource.getRestaurantByName = name =>
    HTTPClient.get(`${BASE_URL}/Restaurant/findByName/${name}`);    

MsRestaurantResource.getrestid = restId =>
    HTTPClient.get(`${BASE_URL}/restaurant/${restId}`);

MsRestaurantResource.getRestByAuthId = authId =>
    HTTPClient.get(`${BASE_URL}/restaurant/listAuthId/${authId}`);

MsRestaurantResource.update = (id, data) =>
    HTTPClient.put(`${BASE_URL}/Restaurant/update/${id}`,data);

MsRestaurantResource.resetPassword = (data) =>
    HTTPClient.post(`${BASE_URL}/Restaurant/resetPassword`,data);

MsRestaurantResource.updatePassword = (authid, data) =>
    HTTPClient.put(`${BASE_URL}/auth/update/${authid}`,data);
    