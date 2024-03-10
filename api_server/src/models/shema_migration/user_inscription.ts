// models/user_inscription.ts
import { DataTypes } from "sequelize";
import Sequelize from "../sql_connect";

const user_inscription = Sequelize.define('user_inscription', {
      user_inscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      mot_de_passe: {
        type: DataTypes.STRING(255),
      },
      pseudo: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      token_validation_email: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      date_token_expiration_email: {
        type: DataTypes.DATE,
        unique: true,
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
      date_pre_inscription: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
  },
      {
        tableName: 'user_inscription',
});

export default user_inscription;