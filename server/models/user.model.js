import bcrypt from 'bcrypt';
import { uniqueID } from '../utils/helpers';

class User {
  constructor() {
    this.type = 'client';
    this.users = [
      {
        id: 1,
        email: 'akanbisegun1@gmail.com',
        firstName: 'Segun',
        lastName: 'Akanbi',
        password: 'protected',
        type: 'admin',
        isStaff: false,
        isAdmin: true,
        createAt: new Date(),
      },
    ];
  }

  create(data) {
    const date = new Date();

    // Hash user password before saving
    const newUser = new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (_err, salt) => {
        // eslint-disable-next-line consistent-return
        bcrypt.hash(data.password, salt, (err, hash) => {
          if (err) return reject(err);
          const result = {
            id: uniqueID(this.users),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: hash,
            type: data.type || this.type,
            isStaff: false,
            isAdmin: false,
            createdAt: date.toString(),
          };
          this.users.push(result);
          resolve(result);
        });
      });
    });
    return newUser;
  }

  addStaff(data) {
    return this.create(data);
  }

  findOne(id) {
    return this.users.find(user => user.id === id);
  }

  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findAll() {
    return this.users;
  }
}

export default new User();
