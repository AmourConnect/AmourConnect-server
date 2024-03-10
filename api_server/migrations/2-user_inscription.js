'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('user_inscription', {
        user_inscription_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(100),
          unique: true,
        },
        mot_de_passe: {
          type: Sequelize.STRING(255),
        },
        pseudo: {
          type: Sequelize.STRING(100),
          unique: true,
        },
        token_validation_email: {
          type: Sequelize.STRING(255),
          unique: true,
        },
        date_token_expiration_email: {
          type: Sequelize.DATE,
          unique: true,
        },
        sexe: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        date_naissance: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        ville: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        date_pre_inscription: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('user_inscription');
  }
};
