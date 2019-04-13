import { uniqueID } from '../utils/helpers';
import Account from './account.model';

class Transaction {
  constructor() {
    this.transactions = [];
  }

  creditAccount(data, accountNumber, cashier) {
    const account = Account.findOne(accountNumber);
    const newBalance = parseFloat(data.amount) + parseFloat(account.balance);

    // Update account
    account.balance = newBalance.toFixed(2);

    const newTransaction = {
      id: uniqueID(this.transactions),
      accountNumber,
      amount: data.amount,
      cashier: cashier.id,
      type: data.type,
      accountBalance: newBalance.toFixed(2),
      date: new Date(),
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default new Transaction();
