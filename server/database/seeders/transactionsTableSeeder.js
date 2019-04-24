/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import DB from '../../config/database';
import Transaction from '../../models/transaction.model';

const transactions = [
  { cashier: 1, amount: 3999.99, type: 'credit' },
  { cashier: 1, amount: 3999.99, type: 'credit' },
  { cashier: 1, amount: 3999.99, type: 'credit' },
  { cashier: 1, amount: 3999.99, type: 'credit' },
  { cashier: 1, amount: 3999.99, type: 'credit' },
  { cashier: 1, amount: 3999.99, type: 'credit' },
];


export default function accountSeeder() {
  DB.query('TRUNCATE transactions CASCADE')
  .then(() => {
    DB.query('SELECT * FROM accounts')
    .then((result) => {
      const addFields = transactions.map((trx, idx) => {
        trx.account_number = result.rows[idx].account_number;
        trx.old_balance = result.rows[idx].balance;
        trx.new_balance = trx.amount + result.rows[idx].balance;
        return trx;
      });
      return addFields;
    })
    .then((acc) => {
      for (const data of acc) {
        Transaction.save(data).then(result => result.rows);
      }
    });
  });
}
