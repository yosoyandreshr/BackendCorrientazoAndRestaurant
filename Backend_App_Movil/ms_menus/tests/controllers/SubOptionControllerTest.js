const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');

const APISubOption = '/api/ms-menus/newMenu/newSubOption';

chai.use(chaiHttp);

describe('Insert SubOption', () => {
  before(() => Helper.migrate());
  beforeEach(async () => {
    await Helper.clear();
  });

  it('Validation error insert Sub Option', () => chai
    .request(app)
    .post(APISubOption)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('validation seccess Sub Option', async () => {
    const menuid = 11;
    const restid = 11;
    const optionid = 11;

    await Helper.createmenu({
      menuId: menuid,
      restId: restid,
      menuName: 'MENU1',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });


    await Helper.createoption({
      optionId: optionid,
      menuId: menuid,
      optionName: 'PROTEINA',
    });


    return chai
      .request(app)
      .post(APISubOption)
      .send({
        optionId: optionid,
        subName: 'RES',
      })
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        assert.equal(status, 200);
        assert.equal(body.length, 1);
      });
  });
});
