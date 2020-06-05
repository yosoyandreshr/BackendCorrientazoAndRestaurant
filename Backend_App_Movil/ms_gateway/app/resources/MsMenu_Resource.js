const MsMenuResource = module.exports;
const HTTPClient = require('../utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:3003' } = process.env;

const BASE_URL = `${MICROSERVICE_URL}/api/ms-menus`;

MsMenuResource.getRestId = restId =>
HTTPClient.get(`${BASE_URL}/menu/${restId}`);

MsMenuResource.getRestIdMenu = (menuId) =>
HTTPClient.get(`${BASE_URL}/menu/option/${menuId}`);

MsMenuResource.getSubOptions = optionId =>
HTTPClient.get(`${BASE_URL}/menu/subOption/${optionId}`);

MsMenuResource.getOptions = menuid =>
HTTPClient.get(`${BASE_URL}/menu/options/${menuid}`);

MsMenuResource.createOption = body =>
HTTPClient.post(`${BASE_URL}/newMenu/newOption`, body);

MsMenuResource.createSubOption = body =>
HTTPClient.post(`${BASE_URL}/newMenu/newSubOption`, body);

MsMenuResource.createMenu = body =>
HTTPClient.post(`${BASE_URL}/newMenu`, body);

MsMenuResource.deleteSubOption = subid =>
HTTPClient.delete(`${BASE_URL}/menu/subOption/${subid}`);

MsMenuResource.updateMenu = (menuid, body) =>
HTTPClient.put(`${BASE_URL}/menu/update/${menuid}`, body);