// CONFIGURATION MYSQL

import path from 'path';
import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

// Charger les variables d'environnement depuis le fichier .env
const envPath = path.resolve(__dirname, '..', '..','.env');
dotenv.config({ path: envPath });

const sequelize = new Sequelize({
  // Configuration de la base de données
  dialect: process.env.DIALECT_SQL as Dialect || 'postgres',
  host: process.env.DB_HOST || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  logging: false, // Désactiver les logs requêtes SQL
  define: {
    timestamps: false, // Désactiver les champs ajoutés automatiquement createdAt et updatedAt
  },
});

export default sequelize;