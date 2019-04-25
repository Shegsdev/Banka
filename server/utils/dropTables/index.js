import debug from 'debug';
import usersSchema from '../../database/migrations/createUsersTable';
import accountsSchema from '../../database/migrations/createAccountsTable';
import transactionsSchema from '../../database/migrations/createTransactionsTable';

const log = debug('express:migration');

(function dropTables() {
  return Promise.all([usersSchema.down(), accountsSchema.down(), transactionsSchema.down()])
    .then(() => log('deleted users table successfully at', new Date()))
    .then(setTimeout(() => {
      log('deleted accounts table successfully at', new Date());
    }, 2000))
    .then(setTimeout(() => {
      log('deleted transactions table successfully at', new Date());
    }, 2000))
    .catch(err => (err ? log('Error dropping table.', err)
      : log('Migrations deleted successfully')));
}());
