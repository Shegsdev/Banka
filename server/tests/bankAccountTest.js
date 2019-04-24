/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import supertest from 'supertest';

import {
  missingFirstname,
  missingLastname,
  missingEmail,
  invalidEmail,
} from '../database/factories/userFactory';

const api = supertest('http://localhost:5000');

describe('Create bank account', () => {
  before((done) => {
    api.post('/api/v1/auth/signup')
      .send({
        firstName: 'Herman',
        lastName: 'Brook',
        email: 'brooks@email.com',
        password: 'no_psswd',
      })
      .end(() => { done(); });
  });
  it('should create a bank account on success', (done) => {
    api.post('/api/v1/accounts')
      .send({
        firstName: 'Herman',
        lastName: 'Brook',
        email: 'brooks@email.com',
        type: 'savings',
      })
      .end((_err, res) => {
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('openingBalance');
        done();
      });
  });

  it('should return error when first name is not provided', (done) => {
    missingFirstname.type = 'savings';
    api.post('/api/v1/accounts')
      .send(missingFirstname)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('First name cannot be blank');
        done();
      });
  });

  it('should return error when last name is not provided', (done) => {
    missingLastname.type = 'savings';
    api.post('/api/v1/accounts')
      .send(missingLastname)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Last name cannot be blank');
        done();
      });
  });

  it('should return error when email is not provided', (done) => {
    missingEmail.type = 'savings';
    api.post('/api/v1/accounts')
      .send(missingEmail)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Email cannot be blank');
        done();
      });
  });

  it('should return error when email is invalid', (done) => {
    invalidEmail.type = 'current';
    api.post('/api/v1/accounts')
      .send(invalidEmail)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Email is invalid');
        done();
      });
  });

  it('should return error when type is not provided', (done) => {
    api.post('/api/v1/accounts')
      .send({
        firstName: 'German',
        lastName: 'Deutsch',
        email: 'legendary@picasso.com',
        password: '🏋️🏋️🏋️',
      })
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Please select an account type');
        done();
      });
  });
});

describe('Change bank account status', () => {
  it('should return error when request details are incomplete', (done) => {
    const accountNumber = 1554798152466;
    api.patch(`/api/v1/accounts/${accountNumber}`)
      .send({})
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Account number or status not provided');
        done();
      });
  });
});

describe('Bank account transactions', () => {
  let accountNumber;
  before((done) => {
    api.get('/api/v1/accounts')
      .end((_err, res) => {
        accountNumber = res.body.data[0].account_number;
        done();
      });
  });
  it('should return all transaction history of specific account', (done) => {
    api.get(`/api/v1/accounts/${accountNumber}/transactions`)
      .end((_err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0]).to.be.a('object');
        expect(res.body.data[0]).to.have.property('transaction_id');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('account_number');
        expect(res.body.data[0]).to.have.property('cashier');
        expect(res.body.data[0]).to.have.property('amount');
        expect(res.body.data[0]).to.have.property('old_balance');
        expect(res.body.data[0]).to.have.property('new_balance');
        done();
      });
  });
});
