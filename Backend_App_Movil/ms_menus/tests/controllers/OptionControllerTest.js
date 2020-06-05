const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');

const APIOption = '/api/ms-menus/newMenu/newOption';

chai.use(chaiHttp);

describe('Insert Option', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('Validation error insert Option', () => chai
    .request(app)
    .post(APIOption)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('validation success Option', async () => {
    const menuid = 10;
    const restid = 10;

    await Helper.createmenu({
      menuId: menuid,
      restId: restid,
      menuName: 'MENU1',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });

    return chai
      .request(app)
      .post(APIOption)
      .send({
        menuId: menuid,
        optionName: 'PROTEINA',
      })
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        assert.equal(status, 200);
        assert.equal(body.length, 1);
      });
  });
});
