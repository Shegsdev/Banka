import { expect } from 'chai';
import supertest from 'supertest';
import { user } from '../database/factories/userFactory';

const api = supertest('http://localhost:5000');

const testUser = {
  firstName: 'mark',
  lastName: 'Henry',
  email: 'mark55@email.com',
  password: 'markhen',
};

describe('Login user account', () => {
  describe('POST /api/v1/auth/signin', () => {
    let token;
    before((done) => {
      api.post('/api/v1/auth/signup')
        .send(testUser)
        .end((_err, res) => {
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
          done();
        });
    });
    it('should return status code 200 on success', (done) => {
      api.post('/api/v1/auth/signin')
        .set('x-access-token', token)
        .send({
          email: 'mark55@email.com',
          password: 'markhen',
        })
        .end((_err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          done();
        });
    });

    it('should return error for invalid login', (done) => {
      api.post('/api/v1/auth/signin')
        .send(user[4])
        .end((_err, res) => {
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.equal('Invalid login details');
          done();
        });
    });
  });
});
