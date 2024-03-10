'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('utilisateur', { 
        utilisateur_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        pseudo: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        photo_profil: {
          type: Sequelize.BLOB('long'),
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
        centre_interet: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        token_session_user: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        token_session_expiration: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        token_forget_email: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        date_expiration_token_email: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        grade: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('utilisateur');
  }
};
