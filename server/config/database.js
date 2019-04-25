import { Pool } from 'pg';
import debug from 'debug';
import { config } from 'dotenv';

config();
const log = debug('express:database');

const connectionString = process.env.DB_URL;

const DB = () => {
  const pool = new Pool({ connectionString });

  // Pool connected
  pool.on('connect', () => { log('Connected to database'); });

  // Pool ended
  pool.on('remove', () => { log('Connection ended successfully'); });

  return pool;
};

export default DB();
