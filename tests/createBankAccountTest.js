import { expect } from 'chai';
import supertest from 'supertest';
import {
  missingFirstname,
  missingLastname,
  missingEmail,
  missingPassword,
  invalidEmail,
} from '../database/factories/userFactory';

const api = supertest('http://localhost:5000');

describe('Create bank account', () => {
  it('should create a bank account on success', (done) => {
    const userInfo = {
      firstName: 'Herman',
      lastName: 'Brook',
      email: 'brooks@email.com',
      password: 'password',
      type: 'savings',
    };
    api.post('/api/v1/accounts')
      .send(userInfo)
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

  it('should return error when password is not provided', (done) => {
    missingPassword.type = 'current';
    api.post('/api/v1/accounts')
      .send(missingPassword)
      .end((_err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Password cannot be blank');
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
    api.patch(`/api/v1/account/${accountNumber}`)
      .send({})
      .end((_err, res) => {
        expect(res.body.status).to.equal(206);
        done();
      });
  });
});
