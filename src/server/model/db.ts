import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '.env')
});

const pool = new Pool({
  connectionString: process.env.PG_URI
});

const query = (queryString: string, values?: unknown[]) => {
  console.log('Running query:', queryString);
  return pool.query(queryString, values);
};

export default query;