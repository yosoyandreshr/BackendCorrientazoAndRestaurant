const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');


chai.use(chaiHttp);

const APIsaveToken = '/api/ms-notifications/notification';
const APIgetTokenDevice = '/api/ms-notifications/notification';

const idUser = 2;

describe('notifications flows', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });


  it('save token of device', () => chai
    .request(app)
    .post(APIsaveToken)
    .send({
      tokenNotification: 'nusandufjvubklauicboasn',
      idUser: 2,
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('get notification', async () => {
    await Helper.create({
      tokenNotification: 'nusandufjvubklauicboasn',
      idUser: 2,
    });

    return chai
      .request(app)
      .get(`${APIgetTokenDevice}/${idUser}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
      });
  });

  it('update notification', () => chai
    .request(app)
    .put(`${APIsaveToken}/${idUser}`)
    .send({
      tokenNotification: 'nusandufjvubklauicboasn',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));
});
