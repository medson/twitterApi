const chai = require('chai');
const factory = require('../factories');
const sinon = require('sinon');

const httpMock = require('node-mocks-http');
const authMiddleware = require('../../app/middlewares/auth');

const { expect } = chai;

describe('Auth Middleware', () => {
  it('it should validate the presence of JWT token', async () => {
    const request = httpMock.createRequest();
    const response = httpMock.createResponse();

    await authMiddleware(request, response);

    expect(response.statusCode).to.be.eq(401);
  });

  it('it should validate  if token is valid', async () => {
    const request = httpMock.createRequest({
      headers: {
        authorization: 'Bearer 123123',
      },
    });

    const response = httpMock.createResponse();

    await authMiddleware(request, response);

    expect(response.statusCode).to.be.eq(401);
  });

  it('it should pass if token is valid', async () => {
    const user = await factory.create('User');

    const request = httpMock.createRequest({
      headers: {
        authorization: `Bearer ${user.generateToken()}`,
      },
    });

    const response = httpMock.createResponse();

    const nextSpy = sinon.spy();

    await authMiddleware(request, response, nextSpy);

    expect(request).to.include({ userId: user.id });
    expect(nextSpy.calledOnce).to.be.true;
  });
});
