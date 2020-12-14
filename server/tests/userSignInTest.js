/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import supertest from 'supertest';
// import { user } from '../database/factories/userFactory';
import { getAppUrl } from '../utils/helpers';

const url = getAppUrl();
const api = supertest(url.origin);

const testUser = {
  firstName: 'mark',
  lastName: 'Henry',
  email: 'mark55@email.com',
  password: 'markhen',
};

// describe('Login user account', () => {
//   describe('POST /api/v2/auth/signin', () => {
//     before((done) => {
//       api.post(`${url.pathname}/auth/signup`)
//         .send(testUser)
//         .end(() => {
//           done();
//         });
//     });
//     it('should return status code 200 on success', (done) => {
//       api.post(`${url.pathname}/auth/signin`)
//         .send({
//           email: 'mark55@email.com',
//           password: 'markhen',
//         })
//         .end((_err, res) => {
//           expect(res.body.status).to.equal(200);
//           expect(res.body.data).to.be.a('object');
//           expect(res.body.data).to.have.property('token');
//           expect(res.body.data).to.have.property('email');
//           expect(res.body.data).to.have.property('firstName');
//           expect(res.body.data).to.have.property('lastName');
//           expect(res.body.data.firstName).to.equal('mark');
//           expect(res.body.data.lastName).to.equal('Henry');
//           expect(res.body.data.email).to.equal('mark55@email.com');
//           done();
//         });
//     });

//     it('should return error for invalid email', (done) => {
//       api.post(`${url.pathname}/auth/signin`)
//         .send({
//           email: 'someemail@user.com',
//           password: 'anypassword',
//         })
//         .end((_err, res) => {
//           expect(res.body.status).to.equal(403);
//           expect(res.body.error).to.be.a('string');
//           expect(res.body.error).to.equal('Sorry, that doesn\'t match any of our records');
//           done();
//         });
//     });
//   });
// });
