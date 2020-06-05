const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const PaymentDetailRepository = require('../../app/repositories/PaymentDetailRepository');
const Helper = require('../Helper');

const APIPaymentDetailSave = '/api/ms-payments/paymentDetail';
const APIPaymentDetailGet = '/api/ms-payments/getDetail';

chai.use(chaiHttp);

describe('Method Post_PaymentDetail', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('validatio insert paymentdetail', async () => {
    const paymentid = 3;
    const userid = 3;
    const orderid = 2;

    await Helper.createpayment({
      paymentId: paymentid,
      userId: userid,
      paymentIdTransations: 'Efec_9206936',
      description: 'Pago a Restautante',
      paymentMethod: 'Efectivo',
      amount: '14000',
      email: 'yosoyandreshr@gmail.com',
    });

    return chai
      .request(app)
      .post(APIPaymentDetailSave)
      .send({
        paymentDetailId: 1,
        paymentId: paymentid,
        orderId: orderid,
      })
      .then(async () => {
        const [data] = await PaymentDetailRepository.getPaymentDetail(paymentid);
        console.log(data);
        assert.equal(data.orderId, orderid);
      });
  });
  it('validatio insert paymentdetail', () => chai
    .request(app)
    .post(APIPaymentDetailSave)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));
});

describe('Method Get_PaymentDetail', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });

  it('validatio get paymentdetail', async () => {
    const paymentid = 4;
    const userid = 4;
    const orderid = 3;

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
      orderId: orderid,
    });

    return chai
      .request(app)
      .get(`${APIPaymentDetailGet}/${paymentid}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 1);
      });
  });
});
