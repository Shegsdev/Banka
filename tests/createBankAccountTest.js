import { expect, describe, it } from 'chai';
import supertest from 'supertest';

const api = supertest('http://localhost:5000');

describe('Create bank account', () => {
  describe('POST /api/v1/accounts', () => {
    it('should return status code 201 on success', (next) => {
      const userInfo = {
        firstName: 'Herman',
        lastName: 'Brook',
        email: 'brooks@email.com',
        password: 'password',
      };
      api.post('/api/v1/auth/signin')
        .send(userInfo)
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          next();
        });
    });
  });
});
