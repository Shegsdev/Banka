import Model from '../utils/model';

class User extends Model {
  constructor() {
    super('users');
  }
}

export default new User();
