const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
// const OrdersRespository = require('../../app/repositories/OrdersRepository');
const Helper = require('../Helper');


const APIgetOrder = '/api/ms-orders/order/restaurant';
const APIgetDetailOrder = '/api/ms-orders/detailOrders';
const APIdeleteDetailOrder = '/api/ms-orders/orderDetail';
const APIsaveOrders = '/api/ms-orders/orders';
const APIsaveOrdersId = '/api/ms-orders/order';
const APIupdateOrder = '/api/ms-orders/orders/update';
const APIgetOrdersActive = '/api/ms-orders/detailOrdersActive';
const APIgetDetailOrders = '/api/ms-orders/orderDetail';
const APIorderAll = '/api/ms-orders/orderAllOrderId';
const APIsaveDetailOrders = '/api/ms-orders/detailOrders';
const APIorderPayment = '/api/ms-orders/orderPayment';
const APIupdateDetailOrder = '/api/ms-orders/detailOrderId';
const APIdeleteOrders = '/api/ms-orders/orders';

const idUsers = 2;

chai.use(chaiHttp);

describe('Orders flows', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });


  it('get one by idUser', async () => {
    await Helper.create({
      orderId: 2,
      userId: 1,
      address: 'una dededed',
      menuId: 5,
      restId: 2,
      menuName: 'albondigas',
      price: 200,
      state: 'ACTIVE',
      image: 'http://res.cloudinary.com/da9ukjthr/image/upload/v1581004614/a9bnq7r1brwuwvdfznof.jpg',
    });

    return chai
      .request(app)
      .get(`${APIgetOrder}/${idUsers}`)
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        assert.equal(status, 200);
      });
  });

  it('get detail order', () => chai
    .request(app)
    .get(`${APIgetDetailOrder}/${idUsers}`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('delete detail order', () => chai
    .request(app)
    .delete(`${APIdeleteDetailOrder}/${idUsers}`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('save orders', () => chai
    .request(app)
    .post(APIsaveOrders)
    .send({
      userId: 1,
      address: 'una dededed',
      menuId: 5,
      restId: 2,
      menuName: 'albondigas',
      price: 200,
      state: 'ACTIVE',
      image: 'http://res.cloudinary.com/da9ukjthr/image/upload/v1581004614/a9bnq7r1brwuwvdfznof.jpg',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('save orders whit id user', () => chai
    .request(app)
    .post(`${APIsaveOrdersId}/${idUsers}`)
    .send({
      userId: 2,
      address: 'una dededed',
      menuId: 5,
      restId: 2,
      menuName: 'albondigas',
      price: 200,
      state: 'ACTIVE',
      image: 'http://res.cloudinary.com/da9ukjthr/image/upload/v1581004614/a9bnq7r1brwuwvdfznof.jpg',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('update orders', () => chai
    .request(app)
    .put(`${APIupdateOrder}/${idUsers}`)
    .send({
      orderId: 2,
      address: 'una carcel',
      menuId: 5,
      restId: 2,
      menuName: 'tajadas',
      price: 200,
      state: 'ACTIVE',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('get detail order active', () => chai
    .request(app)
    .get(`${APIgetOrdersActive}/${idUsers}`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));

  it('get order detail', () => chai
    .request(app)
    .get(`${APIgetDetailOrders}/${idUsers}`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));


  it('get order all', () => chai
    .request(app)
    .get(`${APIorderAll}/${idUsers}`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));


  it('save orders detail', async () => {
    await Helper.create({
      orderId: 2,
      userId: 2,
      address: 'una dededed',
      menuId: 5,
      restId: 2,
      menuName: 'albondigas',
      price: 200,
      state: 'ACTIVE',
      image: 'http://res.cloudinary.com/da9ukjthr/image/upload/v1581004614/a9bnq7r1brwuwvdfznof.jpg',
    });

    return chai
      .request(app)
      .post(APIsaveDetailOrders)
      .send({
        orderId: 2,
        subName: 'arroz',
      })
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
      });
  });

  it('update the order state with it is in the basket', () => chai
    .request(app)
    .put(`${APIorderPayment}/${idUsers}`)
    .send({
      orderId: 2,
      userId: 2,
      address: 'una dededed',
      menuId: 5,
      restId: 2,
      menuName: 'albondigas',
      price: 200,
      state: 'BASKET',
      image: 'http://res.cloudinary.com/da9ukjthr/image/upload/v1581004614/a9bnq7r1brwuwvdfznof.jpg',
    })
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));


  it('update detail order', async () => {
    await Helper.create({
      orderId: 2,
      userId: 2,
      address: 'una dededed',
      menuId: 5,
      restId: 2,
      menuName: 'albondigas',
      price: 200,
      state: 'BASKET',
      image: 'http://res.cloudinary.com/da9ukjthr/image/upload/v1581004614/a9bnq7r1brwuwvdfznof.jpg',
    });

    await Helper.createDetail({
      orderDetailId: 2,
      orderId: 2,
      subName: 'queso',
    });

    return chai
      .request(app)
      .put(`${APIupdateDetailOrder}/${idUsers}`)
      .send({
        orderId: 2,
        subName: 'tajada',
      })
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
      });
  });


  it('delete orders', () => chai
    .request(app)
    .delete(`${APIdeleteOrders}/${idUsers}`)
    .then((response) => {
      const { status } = response;
      assert.equal(status, 200);
    }));
});
