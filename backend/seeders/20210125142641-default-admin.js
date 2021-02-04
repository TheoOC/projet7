'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //need to think about moving bcrypt.hash to sequelize models hooks or not  

    //password of default administrator
    let hashedPassword = `qwerty`;
    await bcrypt.hash(`qwerty`, 10).then((hash) => { hashedPassword = hash }).catch((error) => { console.log(`hash failed: ${error}`) });

    return queryInterface.bulkInsert('Users', [{
      email: `admin@gmail.com`,
      password: `${hashedPassword}`,
      username: `administrator`,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    //remove all users
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.eq]: `admin@gmail.com` }
    }, {});
  }
};
