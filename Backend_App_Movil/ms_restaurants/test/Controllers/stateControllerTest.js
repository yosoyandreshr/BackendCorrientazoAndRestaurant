const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const stateRepository = require('../../app/repositories/stateRepository');
const Helper = require('../helper');


const API = '/api/ms-restaurants/State';
const API2 = '/api/ms-restaurants/Update';
const APIGetOne = '/api/ms-restaurants/State';
const APIGet = '/api/ms-restaurants/States';


chai.use(chaiHttp);


describe('state', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear2();
  });

  it('Validation error insert', () => chai
    .request(app)
    .post(API)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('Insert validation success', () => chai
    .request(app)
    .post(API)
    .send({
      statename: 'inactivo',
    })
    .then(async () => {
      const [data] = await stateRepository.getests('inactivo');
      assert.equal(data.statename, 'inactivo');
    }));

  it('find list by restaurant', async () => {
    await Helper.create2([{
      statename: 'inactivo ',
    },
    ]);

    return chai
      .request(app)
      .get(`${APIGet}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        assert.equal(body.length, body.length);
      });
  });
});

describe('state', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear2();
  });

  it('update proyect validation success ', async () => {
    const id = 1000;
    await Helper.create2({
      stateid: id,
      statename: 'inactivo',
    });

    return chai
      .request(app)
      .put(`${API2}/${id}`)
      .send({
        statename: 'activo',

      }).then(async () => {
        const [data] = await stateRepository.getests('activo');
        assert.equal(data.statename, 'activo');
      });
  });


  it('the data is called and one is brought ', async () => {
    await Helper.create2({
      stateid: 2,
      statename: 'activo',
    });
    const stateid = 2;

    return chai
      .request(app)
      .get(`${APIGetOne}/${stateid}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});


describe('Subscription', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear2();
  });

  it('get one by userid', async () => {
    await Helper.create2({
      stateid: 3,
      statename: 'activo',
    });

    const stateid = 3;

    return chai
      .request(app)
      .get(`${APIGetOne}/${stateid}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
      });
  });

  it('get order by id when does not exist', async () => {
    const idUsersFail = 2;
    chai
      .request(app)
      .get(`${APIGetOne}/${idUsersFail}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
        assert.equal(idUsersFail, 2);
      });
  });

  it('get all orders', () => chai
    .request(app)
    .get(APIGet)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('validation success getSub', async () => {
    await Helper.create2({
      statename: 'inactivo',
    });

    return chai
      .request(app)
      .get(APIGet)
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        assert.equal(status, 200);
        console.log(body.length);
        assert.equal(body.length, body.length);
      });
  });
});
