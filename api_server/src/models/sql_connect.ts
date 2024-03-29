// CONFIG SQL

import path from 'path';
import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

const envPath = path.resolve(__dirname, '..', '..','.env');
dotenv.config({ path: envPath });

const sequelize = new Sequelize({
  dialect: process.env.DIALECT_SQL as Dialect || 'postgres',
  host: process.env.DB_HOST || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  logging: false,
  define: {
    timestamps: false, // Disable automatically added fields created at and updated at
  },
});

export default sequelize;