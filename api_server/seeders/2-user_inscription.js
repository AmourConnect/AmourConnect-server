'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('kaka123@', 10);
    const cle_secret = await crypto.randomBytes(64).toString('hex'); // token session
    await queryInterface.bulkInsert('user_inscription', [{
      pseudo: 'sded',
      email: 'cddd@gmail.com',
      mot_de_passe: hashedPassword,
      token_validation_email: cle_secret,
      date_token_expiration_email: '2024-04-04 06:48:57.877+00',
      ville: 'Paris',
      date_naissance: '1993/12/23',
      sexe: 'Masculin'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_inscription', null, {});
  }
};
