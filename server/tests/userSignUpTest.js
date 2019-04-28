/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import supertest from 'supertest';
import {
  missingFirstname,
  missingLastname,
  missingEmail,
  missingPassword,
} from '../database/factories/userFactory';

const api = supertest('http://localhost:5000');

describe('Create new user account', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should return status code 201 on success', (next) => {
      api.post('/api/v1/auth/signup')
        .send({
          firstName: 'Joel',
          lastName: 'joel',
          email: 'joi@email.com',
          password: 'validate',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.firstName).to.equal('Joel');
          expect(res.body.data.lastName).to.equal('joel');
          expect(res.body.data.email).to.equal('joi@email.com');
          next();
        });
    });
    it('should return error due to registered email', (next) => {
      api.post('/api/v1/auth/signup')
        .send({
          firstName: 'Joi',
          lastName: 'joi',
          email: 'joi@email.com',
          password: 'validate',
        })
        .end((err, res) => {
          expect(res.body.error).to.be.a('string');
          expect(res.body.status).to.equal(409);
          expect(res.body.error).to.equal('Account already exists');
          next();
        });
    });
    it('should return return error due to missing firstname', (done) => {
      api.post('/api/v1/auth/signup')
        .send(missingFirstname)
        .end((err, res) => {
          expect(res.body.error).to.be.a('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.error.firstName).to.equal('Please enter a valid name');
          done();
        });
    });
    it('should return error due to missing lastname', (done) => {
      api.post('/api/v1/auth/signup')
        .send(missingLastname)
        .end((err, res) => {
          expect(res.body.error).to.be.a('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.error.lastName).to.equal('Please enter a valid name');
          done();
        });
    });
    it('should return error due to missing email', (done) => {
      api.post('/api/v1/auth/signup')
        .send(missingEmail)
        .end((err, res) => {
          expect(res.body.error).to.be.a('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.error.email).to.equal('Email cannot be blank');
          done();
        });
    });
    it('should return error due to missing password', (done) => {
      api.post('/api/v1/auth/signup')
        .send(missingPassword)
        .end((err, res) => {
          expect(res.body.error).to.be.a('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.error.password).to.equal('Password cannot be blank');
          done();
        });
    });
  });
});
