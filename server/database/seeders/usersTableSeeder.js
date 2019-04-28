/* eslint-disable no-restricted-syntax */
import { user } from '../factories/userFactory';
import DB from '../../config/database';
import User from '../../models/user';

const adminInfo = {
  firstName: 'Admin',
  lastName: 'Account',
  email: 'admin@banka.com',
  password: '$2b$10$yNBCruKSjV593RECsYeu7eddMlbLqN/LdTyJ0/VPlx4OiT01rXv06',
  type: 'admin',
  is_staff: false,
  is_admin: true,
};
const staffInfo = {
  firstName: 'Staff',
  lastName: 'Account',
  email: 'staff@banka.com',
  password: '$2b$10$yNBCruKSjV593RECsYeu7eddMlbLqN/LdTyJ0/VPlx4OiT01rXv06',
  type: 'staff',
  is_staff: true,
  is_admin: false,
};

const preSeed = async () => {
  try {
    const admin = await `INSERT INTO users (firstname, lastname, email, password, type, is_staff, is_admin) VALUES($1,$2,$3,$4,$5,$6,$7)`;
    const query1 = await DB.query(admin, Object.values(adminInfo));
    const staff = await `INSERT INTO users (firstname, lastname, email, password, type, is_staff, is_admin) VALUES($1,$2,$3,$4,$5,$6,$7)`;
    const query2 = await DB.query(staff, Object.values(staffInfo));
    return {};
  } catch (err) {
      throw new Error(err.stack.split(/\n/)[0]);
  }
}

const userSeeder = () => {
  DB.query('TRUNCATE users CASCADE')
    .then(() => preSeed())
    .then(() => {
      for (const data of user) {
        User.save(data).then(result => result.rows);
      }
    })
    .catch(err => `Could not seed database - ${err}`);
};

export default userSeeder;
