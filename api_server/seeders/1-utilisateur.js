'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const getRandomGender = () => {
  const genders = ['Masculin', 'Feminin'];
  const randomIndex = Math.floor(Math.random() * genders.length);
  return genders[randomIndex];
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i < 50; i++) { // génère 50 utilisateur
      const hashedPassword = await bcrypt.hash('kaka123@', 10);
      const cle_secret = await crypto.randomBytes(64).toString('hex');

      const sexe = getRandomGender(); // Génère un sexe aléatoire

      users.push({
        pseudo: faker.person.fullName(), // Utilisation de Faker pour générer un pseudo aléatoire
        grade: 'user',
        password_hash: hashedPassword,
        email: faker.internet.email(), // Utilisation de Faker pour générer un email aléatoire
        token_session_user: cle_secret,
        token_session_expiration: '2024-04-03 06:48:57.877+00',
        ville: 'Paris', // faker.location.city() Utilisation de Faker pour générer une ville aléatoire
        date_naissance: faker.date.birthdate({ min: 1980, max: 2010, mode: 'year' }), // Génère une date de naissance aléatoire dans les 30 dernières années
        sexe: sexe
      });
    }

    await queryInterface.bulkInsert('utilisateur', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('utilisateur', null, {});
  }
};