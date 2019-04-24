import debug from 'debug';
import usersSchema from '../../database/migrations/createUsersTable';
import accountsSchema from '../../database/migrations/createAccountsTable';
import transactionsSchema from '../../database/migrations/createTransactionsTable';

const log = debug('express:migration');

(function createTables() {
  return Promise.all([usersSchema.up(), transactionsSchema.up()])
    .then(() => log('created users table successfully at', new Date()))
    .then(setTimeout(() => {
      accountsSchema.up();
      log('created accounts table successfully at', new Date());
    }, 2000))
    .then(setTimeout(() => {
      log('created transactions table  successfully at', new Date());
    }, 1000))
    .catch(err => (err ? log('Error creating table.', err)
      : log('Migrations created successfully')));
}());
