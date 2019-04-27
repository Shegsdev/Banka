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

const api = supertest('http://localhost:5000');

describe('Create bank account', () => {
  let token;
  before((done) => {
    api.post('/api/v1/auth/signup')
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
    api.post('/api/v1/accounts')
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
    api.post('/api/v1/accounts')
      .set('x-access-token', token)
      .send(missingFirstname)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error.firstName).to.equal('First name cannot be blank');
        done();
      });
  });

  it('should return error when last name is not provided', (done) => {
    missingLastname.type = 'savings';
    api.post('/api/v1/accounts')
      .set('x-access-token', token)
      .send(missingLastname)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
        expect(res.body.error.lastName).to.equal('Last name cannot be blank');
        done();
      });
  });

  it('should return error when email is not provided', (done) => {
    missingEmail.type = 'savings';
    api.post('/api/v1/accounts')
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
    api.post('/api/v1/accounts')
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
    api.post('/api/v1/accounts')
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
    api.post('/api/v1/admin/new')
      .send(staff)
      .end((_err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('should return error when request details are incomplete', (done) => {
    const accountNumber = 1554798152466;
    api.patch(`/api/v1/accounts/${accountNumber}`)
      .set('x-access-token', token)
      .send({})
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Account number or status not provided');
        done();
      });
  });
});
