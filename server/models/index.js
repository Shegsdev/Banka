import { Pool } from 'pg';
import { config } from 'dotenv';

config();

class Schema {
  constructor(table) {
    this.table = table;
    this.pool = this.initConn();
  }

  // eslint-disable-next-line class-methods-use-this
  initConn() {
    const connectionString = process.env.DB_URL;
    const pool = new Pool({
      connectionString
    });
    return pool;
  }

  async select(params) {
    const result = await this.pool.query(`select ${params} from ${this.table}`);
    return result;
  }

  async save(data) {
    const {
      firstName,
      lastName,
      email,
      password,
      type,
      isAdmin,
    } = data;
    const values = [ firstName, lastName, email, password, type, isAdmin,];
    const text =
      'INSERT INTO users(firstname, lastname, email,password, type, isAdmin)\
      VALUES($1,$2,$3,$4,$5,$6) RETURNING *';

    try {
      const result = await this.pool.query(text, values);
      return result;
    } catch (err) {
      console.log(err.stack)
    }
  }
}

export default Schema;

const userSchema = new Schema('users');
userSchema.select('firstname').then(res => console.log(res.rows[0]));
