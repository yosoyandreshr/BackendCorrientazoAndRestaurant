const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const PaymentRepository = require('../../app/repositories/PaymentRepository');
const Helper = require('../Helper');

const APIPaymentSave = '/api/ms-payments/payment';
const APIPaymentGet = '/api/ms-payments/get';
const APIPaymentCreate = '/api/ms-payments/paymentSave';

chai.use(chaiHttp);

describe('Method Post_Payment', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('Validation insert Payment', () => chai
    .request(app)
    .post(APIPaymentSave)
    .send({
      paymentId: 1,
      userId: 1,
      paymentIdTransations: 'Efec_9206936',
      description: 'Pago a Restautante',
      paymentMethod: 'Efectivo',
      amount: '14000',
      email: 'yosoyandreshr@gmail.com',
    })
    .then(async () => {
      const [data] = await PaymentRepository.getPayment(1);
      assert.equal(data.paymentMethod, 'Efectivo');
    }));

  it('Validation insert Payment', () => chai
    .request(app)
    .post(APIPaymentSave)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('Validation insert Payment', () => chai
    .request(app)
    .post(APIPaymentCreate)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));
});

describe('Method Get_Payment', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('Validation get Payment', async () => {
    const paymentid = 2;
    const userid = 2;

    await Helper.createpayment({
      paymentId: paymentid,
      userId: userid,
      paymentIdTransations: 'Efec_9206936',
      description: 'Pago a Restautante',
      paymentMethod: 'Efectivo',
      amount: '14000',
      email: 'yosoyandreshr@gmail.com',
    });

    await Helper.createpaymentdetail({
      paymentDetailId: 1,
      paymentId: paymentid,
      orderId: 1,
    });

    return chai
      .request(app)
      .get(`${APIPaymentGet}/${userid}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});
