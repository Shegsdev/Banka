import debug from 'debug';
import { config } from 'dotenv';
import DB from '../config/database';

config();
const log = debug('express:model');

class Model {
  constructor(table) {
    this.table = table;
  }

  async save(data) {
    const values = Object.values(data);
    const columns = Object.keys(data).join(',');
    const placeholders = Object.keys(data).map((k, i) => `$${i + 1}`);
    const text = `INSERT INTO ${this.table} (${columns}) VALUES(${placeholders}) RETURNING *`;

    try {
      const result = await DB.query(text, values);
      return result;
    } catch (err) {
      return err.stack;
    }
  }

  async findById(id) {
    try {
      const result = await DB.query(`SELECT * FROM ${this.table} WHERE id = ${id}`);
      return result;
    } catch (err) {
      log(err.stack);
      return err.stack;
    }
  }

  async findBy(column, param) {
    try {
      const result = await DB.query(`SELECT * FROM ${this.table} WHERE ${column} = '${param}'`);
      return result;
    } catch (err) {
      log(err.stack);
      return err.stack;
    }
  }

  async findAllById() {
    try {
      const result = await DB.query(`SELECT * FROM ${this.table} ORDER BY id ASC`);
      return result;
    } catch (err) {
      log(err.stack);
      return err.stack;
    }
  }

  async findOneAndUpdate(column, field, data) {
    const values = Object.values(data);
    const placeholders = Object.keys(data).map((k, i) => `${k}=$${i + 1}`).join(',');
    const text = `UPDATE ${this.table} SET ${placeholders} WHERE ${column} = '${field}' RETURNING *`;
    try {
      const result = await DB.query(text, values);
      return result;
    } catch (err) {
      log(err.stack);
      return err.stack;
    }
  }

  async findOneAndDelete(column, field) {
    try {
      const result = await DB.query(`DELETE FROM ${this.table} WHERE ${column} = '${field}'`);
      return result;
    } catch (err) {
      return err;
    }
  }
}

export default Model;
