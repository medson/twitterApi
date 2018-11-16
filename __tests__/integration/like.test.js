const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');
const factory = require('../factories');

const User = require('../../app/models/user');
const Tweet = require('../../app/models/tweet');

describe('Like', () => {
  beforeEach(async () => {
    await User.remove();
    await Tweet.remove();
  });

  it('it should be able to like an tweet', async () => {
    const tweet = await factory.create('Tweet');
    const user = await factory.create('User');
    const jwtToken = user.generateToken();

    const response = await chai.request(app)
      .post(`/api/likes/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response.body.likes).to.include(user.id);
  }).timeout(8000);
});
