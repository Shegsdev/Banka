/* eslint-disable eqeqeq */
import { config } from 'dotenv';
import DB from '../config/database';

config();

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
      throw new Error(err.stack.split(/\n/)[0]);
    }
  }

  async findById(id, response) {
    try {
      const result = await DB.query(`SELECT * FROM ${this.table} WHERE id = ${id}`);
      return result;
    } catch (err) {
      if (err.code == '42P01') {
        return response.status(500).json({
          status: 500,
          error: `${this.table} table does not exist`,
        });
      }
      return response.status(500).json({
        status: 500,
        error: err.stack.split(/\n/)[0],
      });
    }
  }

  async findBy(column, param, response) {
    try {
      const result = await DB.query(`SELECT * FROM ${this.table} WHERE ${column} = '${param}'`);
      return result;
    } catch (err) {
      if (err.code == '42P01') {
        return response.status(500).json({
          status: 500,
          error: `${this.table} table does not exist`,
        });
      }
      return response.status(500).send({
        status: 500,
        error: err.stack.split(/\n/)[0],
      });
    }
  }

  async findAllById(response) {
    try {
      const result = await DB.query(`SELECT * FROM ${this.table} ORDER BY id ASC`);
      return result;
    } catch (err) {
      if (err.code == '42P01') {
        return response.status(500).json({
          status: 500,
          error: `${this.table} table does not exist`,
        });
      }
      return response.status(500).json({
        status: 500,
        error: err.stack.split(/\n/)[0],
      });
    }
  }

  async findOneAndUpdate(column, field, data, response) {
    const values = Object.values(data);
    const placeholders = Object.keys(data).map((k, i) => `${k}=$${i + 1}`).join(',');
    const text = `UPDATE ${this.table} SET ${placeholders} WHERE ${column} = '${field}' RETURNING *`;
    try {
      const result = await DB.query(text, values);
      return result;
    } catch (err) {
      if (err.code == '42P01') {
        return response.status(500).json({
          status: 500,
          error: `${this.table} table does not exist`,
        });
      }
      return response.status(500).json({
        status: 500,
        error: err.stack.split(/\n/)[0],
      });
    }
  }

  async findOneAndDelete(column, field, response) {
    try {
      const result = await DB.query(`DELETE FROM ${this.table} WHERE ${column} = '${field}'`);
      return result;
    } catch (err) {
      if (err.code == '42P01') {
        return response.status(500).json({
          status: 500,
          error: `${this.table} table does not exist`,
        });
      }
      return response.status(500).json({
        status: 500,
        error: err.stack.split(/\n/)[0],
      });
    }
  }
}

export default Model;
