const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const nodemailer = require('nodemailer');

const transport = {
  sendMail: sinon.spy(),
};

sinon.stub(nodemailer, 'createTransport').returns(transport);

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');
const factory = require('../factories');

const User = require('../../app/models/user');


describe('Authentication', () => {
  // cleanDB
  beforeEach(async () => {
    await User.remove({});
  });

  describe('Sign up', () => {
    it('it should be able to sign up', async () => {
      const user = await factory.attrs('User');

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user);

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
      expect(transport.sendMail.calledOnce).to.be.true;
    });
    it('it should not to be able to sign up with duplicates', async () => {
      const user = await factory.create('User');
      const user2 = await factory.attrs('User', {
        email: user.email,
      });

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user2);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });

  describe('Sign in ', () => {
    it('it should be able to authenticate with valid credentials', async () => {
      const user = await factory.create('User', {
        password: '123456',
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: '123456' });

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });

    it('it should not be able to signin with nonexistent user', async () => {
      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: 'medson@gmail.com', password: '123' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('it should not be able to authenticate with invalid credentials', async () => {
      const user = await factory.create('User', {
        password: '123456',
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: '123' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });
});
