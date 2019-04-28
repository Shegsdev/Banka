import DB from '../../config/database';

const accountsSchema = {
  up() {
    return DB.query(
      `CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL UNIQUE PRIMARY KEY,
        account_number BIGINT UNIQUE NOT NULL,
        owner INT NOT NULL,
        FOREIGN KEY (owner) REFERENCES users (id),
        type VARCHAR(30) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'draft',
        balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT NOW()
      )`,
    );
  },

  down() {
    return DB.query(
      'DROP TABLE IF EXISTS accounts CASCADE',
    );
  },
};

export default accountsSchema;
