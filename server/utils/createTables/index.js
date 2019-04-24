import debug from 'debug';
import usersSchema from '../../database/migrations/create_users_table';
import accountsSchema from '../../database/migrations/create_accounts_table';
import transactionsSchema from '../../database/migrations/create_transactions_table';

const log = debug('express:migration');

(function createTables() {
  return Promise.all([usersSchema.up(), transactionsSchema.up()])
    .then(() => log('created users table at', new Date()))
    .then(setTimeout(() => {
      accountsSchema.up();
      log('created accounts table at', new Date());
    }, 2000))
    .then(setTimeout(() => {
      log('created transactions table at', new Date());
    }, 1000))
    .catch(err => (err ? log('Error creating table.', err)
      : log('Migrations created successfully')));
}());
