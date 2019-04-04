import chai, { expect } from 'chai';
import supertest from 'supertest';
import {
	user,
	missingEmail,
	missingPassword } from './dataFactory/usersData';

const api = supertest('http://localhost:5000');

describe('Login user account', () => {
	describe('POST /api/v1/auth/signin', () => {
		it('should return status code 200 on success', next => {
			let login_user = { email: 'mark55@email.com', password: 'markhen' };
			api.post('/api/v1/auth/signin')
			   .send(login_user)
			   .end((err, res) => {
			   	  expect(res.body.status).to.equal(200);
			   	  next();
			   });
		});

		it('should return error code for invalid login' , next => {
			api.post('/api/v1/auth/signin')
			   .send(user[0])
			   .end((err, res) => {
			   	  expect(res.body.status).to.equal(401);
			   	  next();
			   });
		});

		it('should return invalid login details' , next => {
			api.post('/api/v1/auth/signin')
			   .send(user[1])
			   .end((err, res) => {
			   	  expect(res.body.error).to.equal('Invalid login details');
			   	  next();
			   });
		})
	});
});
