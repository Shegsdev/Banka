import DB from '../../config/database';
import Account from '../../models/account';

const bankAccounts = [
  { account_number: 1248332222246, type: 'savings' },
  { account_number: 1248332222247, type: 'savings' },
  { account_number: 1248332222248, type: 'current' },
  { account_number: 1248332222249, type: 'savings' },
  { account_number: 1248332222250, type: 'current' },
  { account_number: 1248332222251, type: 'savings' },
];


const accountSeeder = () => {
  DB.query('SELECT * FROM users')
    .then((result) => {
      const addOwner = bankAccounts.map((acc, idx) => {
        acc.owner = result.rows[idx].id;
        return acc;
      });
      return addOwner;
    })
    .then((acc) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const data of acc) {
        Account.save(data).then(result => result.rows);
      }
    })
    .catch(err => `Could not seed database - ${err}`);
};

export default accountSeeder;
