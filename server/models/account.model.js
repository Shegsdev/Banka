import { uniqueID } from '../utils/helpers';

class Account {
  constructor() {
    this.accounts = [];
  }

  create(data) {
    const date = new Date();
    // Generate account account number
    const accountNumber = date.getTime();

    const newAccount = {
      id: uniqueID(this.accounts),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      type: data.type,
      accountNumber,
      createdOn: date.toDateString(),
      status: 'draft',
      balance: (0.00).toFixed(2),
    };

    this.accounts.push(newAccount);
    return newAccount;
  }

  findAll() {
    return this.accounts;
  }

  findOne(accountNumber) {
    const account = this.accounts.find(acct => acct.accountNumber === accountNumber);
    return account;
  }

  // Change account status
  changeStatus(accountNumber, data) {
    const account = this.findOne(accountNumber);
    const status = data;
    if (account) {
      account.status = status;
      return account;
    }
    return null;
  }

  // Delete an account
  delete(accountNumber) {
    const account = this.findOne(accountNumber);
    const index = this.accounts.indexOf(account);
    this.accounts.splice(index, 1);
    return {};
  }
}

export default new Account();
