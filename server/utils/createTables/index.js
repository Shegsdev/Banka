import debug from 'debug';
import usersSchema from '../../database/migrations/createUsersTable';
import accountsSchema from '../../database/migrations/createAccountsTable';
import transactionsSchema from '../../database/migrations/createTransactionsTable';

const log = debug('express:migration');

(function createTables() {
  let progress;
  try {
    return Promise.all([usersSchema.up(), transactionsSchema.up()])
      .then(() => {
        log('created users table successfully at', new Date());
        progress = 1;
      })
      .then(setTimeout(() => {
        accountsSchema.up();
        log('created accounts table successfully at', new Date());
        progress = 2;
      }, 2000))
      .then(setTimeout(() => {
        log('created transactions table  successfully at', new Date());
        progress = 3;
      }, 1000))
      .catch(err => (log('Error creating table.', err)));
  } finally {
    if (progress === 3) {
      log('Migrations created successfully');
    }
  }
}());
