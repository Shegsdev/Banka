import Model from '../utils/model';

class Transaction extends Model {
  constructor() {
    super('transactions');
  }
}

export default new Transaction();
