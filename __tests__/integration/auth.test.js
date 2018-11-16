const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');

const User = require('../../app/models/user');

// beforeEach(async () => {
//   await User.remove({});
// });

it('it should be able to authenticate with valid credentials', async () => {
  // const password = '123456';

  const user = await User.create({
    name: 'Medson111',
    username: 'med01011',
    email: 'med0111@facebook.com',
    password: '123456',
  });

  console.log(user.email)
  const response = await chai.request(app)
    .post('/api/signin')
    .send({ email: user.email, password: '123456' });
  expect(response.body).to.have.property('user');
  // expect(response.body).to.have.property('token');
}).timeout(10000);


// describe('Authentication', () => {
//   beforeEach(async () => {
//     await User.remove();
//   })

//   describe('Sign in', () => {
//     it('it should be able to authenticate with valid credentials', async () => {
//       const user = await User.create({
//         name: 'yugi',
//         username: 'yugioh',
//         email: 'yugi@yami.com',
//         password: '123456',
//       });

//       const response = await chai.request(app)
//         .post('/api/signin')
//         .send({ email: user.email, password: '123456' });

//         expect(response.body).to.have.property('user');
//         expect(response.body).to.have.property('token');
//     });
//   });
// });
