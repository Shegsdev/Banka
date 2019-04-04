import chai, { expect } from 'chai';
import supertest from 'supertest';
import {
	user,
	missingEmail,
	missingPassword } from './dataFactory/usersData';

const api = supertest('http://localhost:5000');

describe('Login user account', () => {
	describe('POST /api/v1/auth/signin', () => {
		it('should return status code 201 on success', next => {
			api.post('/api/v1/auth/signin')
			   .send(user[0])
			   .end((err, res) => {
			   	expect(res.body.status).to.equal(201);
			   	next();
			   });
		});
		it('should return same string', () => {
			expect('samething').to.equal('samething');
		});
	});
});
