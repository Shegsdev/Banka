import debug from 'debug';
import userSeeder from './usersTableSeeder';
import accountSeeder from './accountsTableSeeder';
import transactionSeeder from './transactionsTableSeeder';

const log = debug('express:migration');

(function runSeeder() {
  setTimeout(() => {
    userSeeder();
    log('seeded users table successfully at', new Date());
  }, 100);
  setTimeout(() => {
    accountSeeder();
    log('seeded accounts table successfully at', new Date());
  }, 2000);
  setTimeout(() => {
    transactionSeeder();
    log('seeded transactions table successfully at', new Date());
  }, 4000);
}());
