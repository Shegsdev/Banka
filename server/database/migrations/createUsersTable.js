import DB from '../../config/database';

const usersSchema = {
  up() {
    return DB.query(
      `CREATE TABLE IF NOT EXISTS users(
        id SERIAL UNIQUE PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        type VARCHAR(30) NOT NULL DEFAULT 'client',
        is_staff BOOLEAN DEFAULT false,
        is_admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      )`,
    );
  },

  down() {
    return DB.query(
      'DROP TABLE IF EXISTS users CASCADE',
    );
  },
};

export default usersSchema;
