const MsUserResource = module.exports;
const HTTPClient = require('../utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:3001' } = process.env;

const BASE_URL = `${MICROSERVICE_URL}/api/ms-users` ;

MsUserResource.login = body =>
HTTPClient.post(`${BASE_URL}/login`, body);

MsUserResource.save = body =>
HTTPClient.post(`${BASE_URL}/users`,body);

MsUserResource.email = body =>
HTTPClient.post(`${BASE_URL}/email`,body);

MsUserResource.getUser = id =>
HTTPClient.get(`${BASE_URL}/users/${id}`);

MsUserResource.updateUser = (id, data) =>
HTTPClient.put(`${BASE_URL}/users/${id}`,data);

MsUserResource.updatePassword = (authid, data) =>
HTTPClient.put(`${BASE_URL}/auth/update/${authid}`,data);

MsUserResource.resetPassword = (data) =>
HTTPClient.post(`${BASE_URL}/resetPassword`,data);

MsUserResource.getUserbyauthId = id =>
HTTPClient.get(`${BASE_URL}/users/auth/${id}`);

MsUserResource.getUsers = body =>
HTTPClient.get(`${BASE_URL}/users`, body);

MsUserResource.getDirectionsByUser = id =>
HTTPClient.get(`${BASE_URL}/users/directions/${id}`);

MsUserResource.getOneDirection = id =>
HTTPClient.get(`${BASE_URL}/users/direction/${id}`);

MsUserResource.saveDirection = body =>
HTTPClient.post(`${BASE_URL}/users/direction`,body);

MsUserResource.deleteDirection = id =>
 HTTPClient.delete(`${BASE_URL}/deleteDir/${id}`);


    




