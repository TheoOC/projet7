'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserFriends', [{

    }])
  },

  down: async (queryInterface, Sequelize) => {

  }
};
