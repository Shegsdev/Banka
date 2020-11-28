import debug from 'debug';
import usersSchema from '../../database/migrations/createUsersTable';
import accountsSchema from '../../database/migrations/createAccountsTable';
import transactionsSchema from '../../database/migrations/createTransactionsTable';

const log = debug('express:migration');

let progress;
(function dropTables() {
  try {
    return Promise.all([usersSchema.down(), accountsSchema.down(), transactionsSchema.down()])
      .then(() => {
        log('deleted users table successfully at', new Date());
        progress = 1;
      })
      .then(setTimeout(() => {
        log('deleted accounts table successfully at', new Date());
        progress = 2;
      }, 2000))
      .then(setTimeout(() => {
        log('deleted transactions table successfully at', new Date());
        progress = 3;
      }, 2000))
      .catch(err => (log('Error dropping table.', err)));
  } finally {
    if (progress === 3) {
      log('Migrations deleted successfully');
    }
  }
}());
