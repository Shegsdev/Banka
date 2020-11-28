import debug from 'debug';
import userSeeder from './usersTableSeeder';
import accountSeeder from './accountsTableSeeder';
import transactionSeeder from './transactionsTableSeeder';

const log = debug('express:migration');

(function runSeeder() {
  let progress;
  try {
    setTimeout(() => {
      userSeeder();
      log('seeded users table successfully at', new Date());
      progress = 1;
    }, 100);
    setTimeout(() => {
      accountSeeder();
      log('seeded accounts table successfully at', new Date());
      progress = 2;
    }, 2000);
    setTimeout(() => {
      transactionSeeder();
      log('seeded transactions table successfully at', new Date());
      progress = 3;
    }, 4000);
  } finally {
    if (progress === 3) {
      log('Database seeded successfully');
    }
  }
}());
