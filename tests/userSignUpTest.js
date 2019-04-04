import chai, { expect } from 'chai';
import supertest from 'supertest';
// import users from '../server/db/users.db';
import {
	user,
	missingFirstname,
	missingLastname,
	missingEmail,
	missingPassword } from './dataFactory/usersData';

const api = supertest('http://localhost:5000');

describe('Create new user account', () => {
	describe('POST /api/v1/auth/signup', () => {
		it('should return status code 201 on success', next => {
			api.post('/api/v1/auth/signup')
			   .send(user[0])
			   .end((err, res) => {
			   	  expect(res.body.status).to.equal(201);
			   	  next();
			   });
		});
		it('should return error due to registered email', next => {
			api.post('/api/v1/auth/signup')
			   .send(user[0])
			   .end((err, res) => {
			   	  expect(res.body.error).to.equal('Account already exists');
			   	  next();
			   });
		});
		it('should return return error due to missing firstname', done => {
			api.post('/api/v1/auth/signup')
			   .send(missingFirstname)
			   .end((err, res) => {
			   	  expect(res.body.error).to.equal('First name cannot be blank.');
			   	  done();
			   });
		});
		it('should return error due to missing lastname', done => {
			api.post('/api/v1/auth/signup')
			   .send(missingLastname)
			   .end((err, res) => {
			   	  expect(res.body.error).to.equal('Last name cannot be blank.');
			   	  done();
			   });
		});
		it('should return error due to missing email', done => {
			api.post('/api/v1/auth/signup')
			   .send(missingEmail)
			   .end((err, res) => {
			   	  expect(res.body.error).to.equal('Email cannot be blank.');
			   	  done();
			   });
		});
		it('should return error due to missing password', done => {
			api.post('/api/v1/auth/signup')
			   .send(missingPassword)
			   .end((err, res) => {
			   	  expect(res.body.error).to.equal('Password cannot be blank.');
			   	  done();
			   });
		});
		// beforeEach((done) => {
		// 	users.filter(user => user !== user);
		// 	done();
		// });
	});

	describe('POST /api/v1/auth/signup', () => {
		it('should return data property as object', done => {
			api.post('/api/v1/auth/signup')
			   .send(user[1])
			   .end((err, res) => {
			   	  expect(res.body.data).to.be.a('object');
			   	  done();
			   });
		});

		it('should return data containing token', done => {
			api.post('/api/v1/auth/signup')
			   .send(user[2])
			   .end((err, res) => {
			   	  expect(res.body.data).to.have.property('token');
			   	  done();
			   });
		});
	})
});
