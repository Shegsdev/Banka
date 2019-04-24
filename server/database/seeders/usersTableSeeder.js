/* eslint-disable no-restricted-syntax */
import { user } from '../factories/userFactory';
import DB from '../../config/database';
import User from '../../models/user.model';

export default function userSeeder() {
  DB.query('TRUNCATE users CASCADE')
    .then(() => {
      for (const data of user) {
        User.save(data).then(result => result.rows)
      }
    });
}

userSeeder()