'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('message_pv', { 
         message_pv_id: { 
            type:Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        expediteur_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'utilisateur', // Nom de la table cible
            key: 'utilisateur_id', // Clé primaire de la table cible
          },
          onUpdate: 'CASCADE', // Met à jour la clé étrangère si la clé primaire est mise à jour
          onDelete: 'CASCADE', // Supprime les enregistrements liés si la clé primaire est supprimée
        },
        destinataire_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { // references clés étrangères
            model: 'utilisateur',
            key: 'utilisateur_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        contenu: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        date_envoi: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    // ajoutation des clés étrangères
    await queryInterface.addConstraint('message_pv', {
      fields: ['expediteur_id'],
      type: 'foreign key',
      name: 'fk_messages_expediteur',
      references: {
        table: 'utilisateur',
        field: 'utilisateur_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('message_pv', {
      fields: ['destinataire_id'],
      type: 'foreign key',
      name: 'fk_messages_destinataire',
      references: {
        table: 'utilisateur',
        field: 'utilisateur_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });


  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('message_pv');
  }
};
