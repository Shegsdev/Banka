import debug from 'debug';
import usersSchema from '../../database/migrations/create_users_table';
import accountsSchema from '../../database/migrations/create_accounts_table';
import transactionsSchema from '../../database/migrations/create_transactions_table';

const log = debug('express:migration');

(function dropTables() {
  return Promise.all([usersSchema.down(), accountsSchema.down(), transactionsSchema.down()])
    .then(() => log('deleted users table at', new Date()))
    .then(setTimeout(() => {
      log('deleted accounts table at', new Date());
    }, 2000))
    .then(setTimeout(() => {
      log('deleted transactions table at', new Date());
    }, 2000))
    .catch(err => (err ? log('Error dropping table.', err)
      : log('Migrations deleted successfully')));
}());
