'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hashedPassword = `qwerty`;
    await bcrypt.hash(`qwerty`, 10).then((hash) => { hashedPassword = hash }).catch((error) => { console.log(`hash failed: ${error}`) });

    return queryInterface.bulkInsert('Users', [{
      email: `firstuser@gmail.com`,
      password: `${hashedPassword}`,
      username: `first username`,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: `seconduser@gmail.com`,
      password: `${hashedPassword}`,
      username: `second username`,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: `thirduser@gmail.com`,
      password: `${hashedPassword}`,
      username: `third username`,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: `fourthuser@gmail.com`,
      password: `${hashedPassword}`,
      username: `fourth username`,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: `fifthuser@gmail.com`,
      password: `${hashedPassword}`,
      username: `fifth username`,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
