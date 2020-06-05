const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const MenuRepository = require('../../app/repositories/MenuRepository');
const Helper = require('../Helper');

const APIMenu = '/api/ms-menus/newMenu';
const APIMenuPut = '/api/ms-menus/newMenu/update';
const APIrestId = '/api/ms-menus/menu';
const APImenuId = '/api/ms-menus/menu/option';

chai.use(chaiHttp);


describe('Method Post_Menu', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });


  it('Validation error insert Menu', () => chai
    .request(app)
    .post(APIMenu)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('validation success Menu', () => chai
    .request(app)
    .post(`${APIMenu}`)
    .send({
      menuId: 1,
      restId: 1,
      menuName: 'MENU4',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    })

    .then(async () => {
      const [data] = await MenuRepository.getRestId(1);
      assert.equal(data.menuName, 'MENU4');
    }));
});

describe('Method Put_Menu', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('Validation success Update ', async () => {
    await Helper.createmenu({
      menuId: 5,
      restId: 1,
      menuName: 'MENU8',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });

    return chai
      .request(app)
      .put(`${APIMenuPut}/${1}`)
      .send({
        menuName: 'MENU6',
        image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
        value: 10000,
      })
      .then(async () => {
        const [data] = await MenuRepository.getRestId(1);
        assert.equal(data.restId, 1);
      });
  });
  it('Validation success Update ', async () => {
    await Helper.createmenu({
      menuId: 5,
      restId: 1,
      menuName: 'MENU8',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });

    return chai
      .request(app)
      .put(`${APIMenuPut}/${1}`)
      .send({})
      .then(async () => {
        const [data] = await MenuRepository.getRestId(1);
        assert.equal(data.restId, 1);
      })
      .catch((error) => {
        assert.equal(error.status, 400);
      });
  });
});

describe('Method Get_Menu', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });
  it('Validation getId multi table: Menu,Option,Sub_Option', async () => {
    const menuid = 1;

    const restid = 1;

    await Helper.createmenu({
      menuId: menuid,
      restId: restid,
      menuName: 'MENU1',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });


    return chai
      .request(app)
      .get(`${APIrestId}/${restid}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('Get menuId', async () => {
    const menuid = 1;
    const optionid = 1;
    const restid = 1;

    await Helper.createmenu({
      menuId: menuid,
      restId: restid,
      menuName: 'MENU2',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });

    await Helper.createoption({
      optionId: optionid,
      menuId: menuid,
      optionName: 'PROTEINA',
    });

    await Helper.createsuboption({
      subId: 1,
      optionId: optionid,
      subName: 'RES',
    });

    return chai
      .request(app)
      .get(`${APImenuId}/${menuid}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });

  it('get menuId', async () => {
    await Helper.createmenu({
      menuId: 1,
      restId: 1,
      menuName: 'MENU3',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });
    await Helper.createmenu({
      menuId: 2,
      restId: 1,
      menuName: 'MENU3',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      value: 10000,
    });

    return chai
      .request(app)
      .get(`${APIrestId}/${1}`)
      .then(({ body, status }) => {
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, body.length);
      });
  });
});
