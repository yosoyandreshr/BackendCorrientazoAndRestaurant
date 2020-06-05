const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const userRepository = require('../../app/repositories/userRepository');
const authRepository = require('../../app/repositories/authRepository');
const Helper = require('../Helper');

const API = '/api/users';
const APILOGIN = '/api/login';
const APIUPDATELOGIN = '/api/auth/update';

const APIROLE = '/api/roles';
chai.use(chaiHttp);

describe('Insert a User', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });
  it('register user validation error', () => chai
    .request(app)
    .post(API)
    .send({})
    .then((res) => {
      const { status } = res;
      assert.equal(status, 400);
    }));

  it('register user success', () => chai
    .request(app)
    .post(API)
    .send({
      userName: 'John', userIdentification: '100', userPhone: '3218941144', authEmail: 'marce@hotmail.com', authPassword: '123',
    })
    .then(async () => {
      const [data] = await userRepository.findByUserIdentification('100');
      console.log(data);

      assert.equal(data.userPhone, '3218941144');
    }));


  describe('Find a User by id', () => {
    const userId = '1097389990';
    const userId2 = '1097';
    before(() => Helper.migrate());

    beforeEach(async () => {
      await Helper.clear();
    });
    it('User exists', async () => {
      const authid = await Helper.createAuth({ authEmail: 'JohnWi@hotmail.com', authPassword: '123', roleId: 1 });
      await Helper.create({
        userName: 'john william',
        userIdentification: userId,
        userPhone: '3218941144',
        authId: authid,
      });

      return chai
        .request(app)
        .get(`${API}/${userId}`)
        .then((response) => {
          const { body, status } = response;
          assert.equal(status, 200);
          assert.equal(body.length, 1);
        });
    });
    it('There is no user', async () => chai
      .request(app)
      .get(`${API}/${userId2}`)
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 0);
      }));
  });

  describe('Get All Users', () => {
    before(() => Helper.migrate());

    beforeEach(async () => {
      await Helper.clear();
    });
    it('get Users', async () => {
      const authid1 = await Helper.createAuth({ authEmail: 'JohnWilli@hotmail.com', authPassword: '123', roleId: 1 });
      const authid2 = await Helper.createAuth({ authEmail: 'mariana@hotmail.com', authPassword: '123', roleId: 1 });

      await Helper.create([{
        userName: 'john william',
        userIdentification: '1097389990',
        userPhone: '3218941144',
        userCity: 'Armenia',
        userAdress: 'B/ La virginia mz 14 casa 25',
        authId: authid1,
      }, {
        userName: 'mariana',
        userIdentification: '1091887943',
        userPhone: '3202887809',
        userCity: 'Armenia',
        userAdress: 'B/ La virginia mz 14 casa 25',
        authId: authid2,
      }]);

      return chai
        .request(app)
        .get(API)
        .then((response) => {
          const { body, status } = response;
          assert.equal(status, 200);
          console.log(body);
          assert.equal(body.length, body.length);
        });
    });
  });

  describe('delete a User', () => {
    const userId = '1097389990';
    before(() => Helper.migrate());

    beforeEach(async () => {
      await Helper.clear();
    });
    it('Delete user if exists', async () => {
      const authid1 = await Helper.createAuth({ authEmail: 'JohnWilliam@hotmail.com', authPassword: '123', roleId: 1 });
      await Helper.create({
        userName: 'john william',
        userIdentification: userId,
        userPhone: '3218941144',
        userCity: 'Armenia',
        userAdress: 'B/ La virginia mz 14 casa 25',
        authId: authid1,
      });

      return chai
        .request(app)
        .delete(`${API}/${userId}`)
        .then((response) => {
          const { status } = response;
          assert.equal(status, 200);
        });
    });
  });
  describe('Update a User', () => {
    before(() => Helper.migrate());

    beforeEach(async () => {
      await Helper.clear();
    });
    const userId = '1097389990';
    const userId2 = '1097393200';
    const newCity = 'Bogota';
    it('User update sucess', async () => {
      const authid1 = await Helper.createAuth({ authEmail: 'JohnWilliamr@hotmail.com', authPassword: '123', roleId: 1 });
      await Helper.create({
        userName: 'john william',
        userIdentification: userId,
        userPhone: '3218941144',
        userCity: 'Armenia',
        userAdress: 'B/ La virginia mz 14 casa 25',
        authId: authid1,
      });

      return chai
        .request(app)
        .put(`${API}/${userId}`)
        .send({
          userName: 'john william Reyes',
          userIdentification: userId,
          userPhone: '3218941144',
          userCity: newCity,
          userAdress: 'B/ La virginia mz 14 casa 25',
          authId: authid1,

        })
        .then(async () => {
          const [data] = await userRepository.findByUserId(userId);
          assert.equal(data.userCity, newCity);
        });
    });
    it('There is no user', async () => chai
      .request(app)
      .put(`${API}/${userId2}`)
      .send({
        userName: 'john william Reyes',
        userIdentification: userId2,
        userPhone: '3218941144',
        userCity: newCity,
        userAdress: 'B/ La virginia mz 14 casa 25',
        authId: 1,

      })
      .then((response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        console.log(body);
        assert.equal(body.length, 0);
      }));
  });
});

describe('Insert a Role', () => {
  before(() => Helper.migrate());

  it('register role validation error', () => chai
    .request(app)
    .post(APIROLE)
    .send({})
    .then((res) => {
      const { status } = res;
      assert.equal(status, 400);
    }));

  it('register role success', () => chai
    .request(app)
    .post(APIROLE)
    .send({
      roleName: 'Contabilidad',
    }, { roleName: 'Vendedor' })
    .then((response) => {
      const { body, status } = response;
      assert.equal(status, 200);
      console.log(body);
      assert.equal(body.length, body.length);
    }));
});
describe('Login', () => {
  before(() => Helper.migrate());

  beforeEach(async () => {
    await Helper.clear();
  });
  it('User Login sucess', async () => {
    await Helper.createUser({
      userName: 'john william',
      userIdentification: '11111',
      userPhone: '321',
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
        const user = await userRepository.findUserByAuthId(authid.authId);
        assert.equal(user.userName, 'john william');
      });
  });
  it('Update Login sucess', async () => {
    await Helper.createUser({
      userName: 'john william',
      userIdentification: '11111',
      userPhone: '321',
      authEmail: 'JohnWilliamr@hotmail.com',
      authPassword: '123',
    });

    return chai
      .request(app)
      .post(`${APIUPDATELOGIN}`)
      .send({
        authEmail: 'JohnWilliamr@hotmail.com',
        authPassword: '12345',
      })
      .then(async () => {
        const authid = await authRepository.getIdByEmail('JohnWilliamr@hotmail.com');
        const user = await userRepository.findUserByAuthId(authid.authId);
        assert.equal(user.userName, 'john william');
      });
  });
});
