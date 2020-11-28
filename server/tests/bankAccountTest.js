/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import supertest from 'supertest';

import {
  staff,
  missingFirstname,
  missingLastname,
  missingEmail,
  invalidEmail,
} from '../database/factories/userFactory';

import { getAppUrl } from '../utils/helpers';

const url = getAppUrl();
const api = supertest(url.origin);

describe('Create bank account', () => {
  let token;
  before((done) => {
    api.post(`${url.pathname}/auth/signup`)
      .send({
        firstName: 'Herman',
        lastName: 'Brook',
        email: 'brooks@email.com',
        password: 'no_psswd',
      })
      .end((_err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('should create a bank account on success', (done) => {
    api.post(`${url.pathname}/accounts`)
      .set('x-access-token', token)
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
    api.post(`${url.pathname}/accounts`)
      .set('x-access-token', token)
      .send(missingFirstname)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error.firstName).to.equal('Please enter a valid name');
        done();
      });
  });

  it('should return error when last name is not provided', (done) => {
    missingLastname.type = 'savings';
    api.post(`${url.pathname}/accounts`)
      .set('x-access-token', token)
      .send(missingLastname)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error.lastName).to.equal('Please enter a valid name');
        done();
      });
  });

  it('should return error when email is not provided', (done) => {
    missingEmail.type = 'savings';
    api.post(`${url.pathname}/accounts`)
      .set('x-access-token', token)
      .send(missingEmail)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.a('object');
        expect(res.body.error.email).to.equal('Email cannot be blank');
        done();
      });
  });

  it('should return error when email is invalid', (done) => {
    invalidEmail.type = 'current';
    api.post(`${url.pathname}/accounts`)
      .set('x-access-token', token)
      .send(invalidEmail)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error.email).to.equal('Email is invalid');
        done();
      });
  });

  it('should return error when type is not provided', (done) => {
    api.post(`${url.pathname}/accounts`)
      .set('x-access-token', token)
      .send({
        firstName: 'German',
        lastName: 'Deutsch',
        email: 'legendary@picasso.com',
        password: '🏋️🏋️🏋️',
      })
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error.type).to.equal('Please select a valid account type');
        done();
      });
  });
});

describe('Change bank account status', () => {
  let token;
  before((done) => {
    api.post(`${url.pathname}/auth/signin`)
      .send(staff)
      .end((_err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('should return error when request details are incomplete', (done) => {
    const accountNumber = 1554798152466;
    api.patch(`${url.pathname}/accounts/${accountNumber}`)
      .set('x-access-token', token)
      .send({})
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Account status not provided');
        done();
      });
  });
});

describe('Get all accounts of a specific user', () => {
  let token;
  let email;
  before((done) => {
    api.post(`${url.pathname}/auth/signin`)
      .send(staff)
      .then((res) => {
        token = res.body.data.token;
      }).then(() => {
        api.get(`${url.pathname}/users`)
          .set('x-access-token', token)
          .end((_err, res) => {
            email = res.body.data[4].email;
            done();
          });
      });
  });
  it('should return all accounts of user', (done) => {
    api.get(`${url.pathname}/user/${email}/accounts`)
      .set('x-access-token', token)
      .end((_err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('owner');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
        expect(res.body.data[0]).to.have.property('account_number');
        done();
      });
  });
});
