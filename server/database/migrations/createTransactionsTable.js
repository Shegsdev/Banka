import DB from '../../config/database';

const transactionsSchema = {
  up() {
    return DB.query(
      `CREATE TABLE IF NOT EXISTS transactions(
        transaction_id SERIAL PRIMARY KEY,
        type VARCHAR(30) NOT NULL,
        account_number BIGINT NOT NULL,
        cashier INT NOT NULL,
        amount REAL NOT NULL,
        old_balance REAL NOT NULL,
        new_balance REAL NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )`,
    );
  },

  down() {
    return DB.query(
      'DROP TABLE IF EXISTS transactions CASCADE',
    );
  },
};

export default transactionsSchema;
