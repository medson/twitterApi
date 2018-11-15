const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const soma = (x,y) => x+y;

it('soma duas variáveis', () => {
  const sum = soma(3,5);

  expect(sum).to.be.eq(8);
});
