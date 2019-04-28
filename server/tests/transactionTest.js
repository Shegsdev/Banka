/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import supertest from 'supertest';

import { admin, staff } from '../database/factories/userFactory';


const api = supertest('http://localhost:5000');

describe('Get a specific transaction', () => {
  const userInfo = {
    firstName: 'Herman',
    lastName: 'Brook',
    email: 'brook@email.com',
    password: 'no_psswd',
  }

  let userToken;
  let accountNumber;
  let transactionId;
  before((done) => {
      api.post('/api/v1/auth/signup')
      .send(userInfo)
      .then((res) => {
        userToken = res.body.data.token;
      })
      .then(() => {
        api.post('/api/v1/accounts')
        .set('x-access-token', userToken)
        .send({
          firstName: 'Herman',
          lastName: 'Brook',
          email: 'brook@email.com',
          type: 'savings',
        })
        .then((res) => {
          accountNumber = res.body.data.accountNumber;
          done();
        });
      })
  });
  before((done) => {
    let staffToken;
    api.post('/api/v1/auth/signin')
      .send(staff)
      .then((res) => {
        staffToken = res.body.data.token;
      })
      .then(() => {
        api.post(`/api/v1/transactions/${accountNumber}/credit`)
          .set('x-access-token', staffToken)
          .send({
            amount: '2999.99'
          })
          .end((_err, res) => {
            transactionId = res.body.data.transactionId;
            done();
          })
      })
  });
  it('should return a specific transaction', (done) => {
    api.get(`/api/v1/transactions/${transactionId}`)
      .set('x-access-token', userToken)
      .end((_err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('oldBalance');
        expect(res.body.data).to.have.property('newBalance');
        expect(res.body.data).to.have.property('transactionId');
        expect(res.body.data).to.have.property('accountNumber');
        done();
      });
  });
});