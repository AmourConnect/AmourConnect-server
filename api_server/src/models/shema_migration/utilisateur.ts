// models/utilisateur.ts
import { DataTypes } from'sequelize';
import Sequelize from'../sql_connect';

    const Utilisateur = Sequelize.define('utilisateur', {
          utilisateur_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          pseudo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
          },
          email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
          },
          password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          photo_profil: {
            type: DataTypes.BLOB('long'),
          },
          created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          sexe: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          date_naissance: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          ville: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          centre_interet: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          token_session_user: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          token_session_expiration: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          token_forget_email: {
            type: DataTypes.STRING(200),
            allowNull: true,
          },
          date_expiration_token_email: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          grade: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
    },
      {
        tableName: 'utilisateur'
    });

export default Utilisateur;