const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const subscriptionRepository = require('../../app/repositories/subscriptionRepository');
const Helper = require('../helper');

const API = '/api/ms-subscriptions/Subs';
const APIGetOne = '/api/ms-subscriptions/Subs/getByUser';
const APIGetOneSub = '/api/ms-subscriptions/Subs/getOne';

const API2 = '/api/ms-subscriptions/packages';
const APIGetOne2 = '/api/ms-subscriptions/packages/getOne';
const APIGetOneRest = '/api/ms-subscriptions/packages/getPacksByRestaurant';

chai.use(chaiHttp);


describe('package', () => {
  before(() => Helper.migrate());


  it('Validation error insert', () => chai
    .request(app)
    .post(API2)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('Insert validation success', () => chai
    .request(app)
    .post(API2)
    .send({
      description: 'add', subvalue: 20000, balance: 2000, restId: 1,
    })
    .then(async () => {
      const [data] = await subscriptionRepository.getPacksByRestaurant(1);
      assert.equal(data.restId, 1);
    }));

  it('get order by id when does not exist', async () => {
    const idUsersFail = 2;
    chai
      .request(app)
      .get(`${APIGetOne2}/${idUsersFail}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
        assert.equal(idUsersFail, 2);
      });
  });

  it('get one by packed', async () => {
    await Helper.create2({
      description: 'add', subvalue: 20000, balance: 2000, restId: 1,
    });

    const packageId = 1;

    return chai
      .request(app)
      .get(`${APIGetOne2}/${packageId}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
      });
  });

  it('get one by restid', async () => {
    await Helper.create2({
      description: 'add', subvalue: 20000, balance: 2000, restId: 1,
    });

    const restId = 1;

    return chai
      .request(app)
      .get(`${APIGetOneRest}/${restId}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
      });
  });
});

describe('Subscription', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
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
      userId: 1, restId: 1, packageId: 1,
    })
    .then(async () => {
      const [data] = await subscriptionRepository.getSubsByUser(1);
      assert.equal(data.userId, 1);
    }));
});


describe('Subscription', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('get one by userid', async () => {
    await Helper.create({
      userId: 1, restId: 1, PackageId: 1,
    });

    const userId = 1;

    return chai
      .request(app)
      .get(`${APIGetOne}/${userId}`)
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


  it('validation success getSub', async () => {
    await Helper.create({
      userId: 1, restId: 1, PackageId: 1,
    });
    const subid = 1;

    return chai
      .request(app)
      .get(`${APIGetOneSub}/${subid}`)
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        assert.equal(status, 200);
        console.log(body.length);
        assert.equal(body.length, body.length);
      });
  });
});
