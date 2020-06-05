const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const restaurantRepository = require('../../app/repositories/restaurantRepository');
const authRepository = require('../../app/repositories/authRepository');
const Helper = require('../helper');

const API = '/api/ms-restaurants/Restaurant';
const APILOGIN = '/api/ms-restaurants/login';
const APIUPDATELOGIN = '/api/ms-restaurants/auth/update';
const APIGetOneRest = '/api/ms-restaurants/Restaurant';
const APIGet = '/api/ms-restaurants/Restaurant';
const APIGetOneAuthId = '/api/ms-restaurants/Restaurant/listAuthId';
const APIEmail = '/api/ms-restaurants/auth';
const APIGetEmail = '/api/ms-restaurants/Restaurant/auth';
const findByCity = '/api/ms-restaurants/Restaurant/findByCity';
const findByName = '/api/ms-restaurants/Restaurant/findByName';
chai.use(chaiHttp);


describe('restaurant', () => {
  const id = 45;
  const Email = 'sclents22@outlook.com';
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

  it('User Login sucess', async () => {
    await Helper.createrestaurant({
      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',
      authEmail: 'JohnWilliamr@hotmail.com',
      authPassword: '123',
    });

    return chai
      .request(app)
      .post(`${APILOGIN}`)
      .send({

        authEmail: 'JohnWilliamr@hotmail.com',
        authPassword: '123',
      })
      .then(async () => {
        const authid = await authRepository.getIdByEmail('JohnWilliamr@hotmail.com');
        const restaurant = await restaurantRepository.findUserByAuthId(authid.authId);
        assert.equal(restaurant.namerestaurant, 'camarones marina');
      });
  });

  it('Update Login sucess', async () => {
    await Helper.createrestaurant({

      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',
      authEmail: 'johnWilliam@gmail.com',
      authPassword: '123',
      authId: id,
    });

    return chai
      .request(app)
      .put(`${APIUPDATELOGIN}/${id}`)
      .send({
        authEmail: 'JohnWilliamr@hotmail.com',
        authPassword: '12345',
      })
      .then(assert.fail)
      .catch((error) => {
        assert(error, 200);
      });
  });


  it('get auth id by email', async () => {
    await Helper.createAuth([{
      authEmail: Email, authPassword: '123',
    },
    ]);

    return chai
      .request(app)
      .get(`${APIEmail}/${Email}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        assert.equal(body.length, body.length);
      });
  });

  it('get Users', async () => {
    const authid1 = await Helper.createAuth({ authEmail: 'JohnWilli@hotmail.com', authPassword: '123' });
    const authid2 = await Helper.createAuth({ authEmail: 'mariana@hotmail.com', authPassword: '123' });
    await Helper.create([{
      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',
      authId: authid1,
    }, {
      stateid: 'Activo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'calarca',
      authId: authid2,
    }]);

    return chai
      .request(app)
      .get(`${APIGetOneRest}/${authid1}`)
      .then(assert.fail)
      .catch((error) => {
        assert(error, 404);
      });
  });


  it('get order by id when does not exist', async () => {
    const idUsersFail = 2;
    chai
      .request(app)
      .get(`${APIGet}/${idUsersFail}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
        assert.equal(idUsersFail, 2);
      });
  });
});


describe('restaurant', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });
  it('get one by userid', async () => {
    await Helper.create({
      restid: 2,
      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',

    });

    const restid = 3;

    return chai
      .request(app)
      .get(`${APIGetOneRest}/${restid}`)
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
      .get(`${APIGetOneRest}/${idUsersFail}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
        assert.equal(idUsersFail, 2);
      });
  });

  it('find list by restaurant', async () => {
    await Helper.create([{
      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',

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
  it('get auth id by user id', async () => {
    const idUsersFail = 2;
    chai
      .request(app)
      .get(`${APIEmail}/${idUsersFail}`)
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
    await Helper.create({
      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',
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

  it('validation success', async () => {
    await Helper.create({
      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',
    });
    const authId = 1;

    return chai
      .request(app)
      .get(`${APIGetOneAuthId}/${authId}`)
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        assert.equal(status, 200);
        console.log(body.length);
        assert.equal(body.length, body.length);
      });
  });

  it('get order by id when does not exist', async () => {
    const idUsersFail = 2;
    chai
      .request(app)
      .get(`${APIGet}/${idUsersFail}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
        assert.equal(idUsersFail, 2);
      });
  });

  it('validation success', async () => {
    await Helper.create({
      stateid: 'inactivo',
      restnit: 2000,
      namerestaurant: 'camarones marina',
      description: 'Los Mejores Sabores del mar a tu plato',
      image: 'http://res.cloudinary.com/sclents22/image/upload/v1579635788/atelier_portada_zhokbp.jpg',
      celphone: 123433,
      direction: 'mz23 #23',
      schedule: '3:00 am , 5:00pm',
      city: 'Armenia',
    });
    const authId = 1;

    return chai
      .request(app)
      .get(`${APIGetEmail}/${authId}`)
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        assert.equal(status, 200);
        console.log(body.length);
        assert.equal(body.length, body.length);
      });
  });

  it('get auth id by user id', async () => {
    const citiFale = 'armenia';
    chai
      .request(app)
      .get(`${findByCity}/${citiFale}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
        assert.equal(citiFale, 'armenia');
      });
  });

  it('get auth id by user id', async () => {
    const namefale = 'restaurantes';
    chai
      .request(app)
      .get(`${findByName}/${namefale}`)
      .then((response) => {
        const { status } = response;
        assert.equal(status, 200);
        assert.equal(namefale, 'restaurantes');
      });
  });
});
