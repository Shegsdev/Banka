import { uniqueID } from '../utils/helpers';

class Transaction {
  constructor() {
    this.transactions = [];
  }

  creditAccount(data, accountNumber /* cashier */) {
    const newTransaction = {
      id: uniqueID(this.transactions),
      accountNumber,
      amount: data.amount,
      cashier: data.cashier,
      type: 'credit',
      accountBalance: data.newBalance,
      date: new Date(),
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }

  debitAccount(data, accountNumber /* cashier */) {
    const newTransaction = {
      id: uniqueID(this.transactions),
      accountNumber,
      amount: data.amount,
      cashier: data.cashier,
      type: 'debit',
      accountBalance: data.newBalance,
      date: new Date(),
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default new Transaction();
