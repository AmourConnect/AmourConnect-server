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

    for (let i = 0; i < 50; i++) { // generate 50 users
      const hashedPassword = await bcrypt.hash('kaka123@', 10);
      const cle_secret = await crypto.randomBytes(64).toString('hex');

      const sexe = getRandomGender();

      users.push({
        pseudo: faker.person.fullName(), // Using Faker to generate a random nickname
        grade: 'user',
        password_hash: hashedPassword,
        email: faker.internet.email(), // Using Faker to generate a random email
        token_session_user: cle_secret,
        token_session_expiration: '2024-04-03 06:48:57.877+00',
        ville: 'Paris', // faker.location.city() Using Faker to Generate a Random City
        date_naissance: faker.date.birthdate({ min: 1980, max: 2010, mode: 'year' }), // Generates a random date of birth within the last 30 years
        sexe: sexe
      });
    }

    await queryInterface.bulkInsert('utilisateur', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('utilisateur', null, {});
  }
};