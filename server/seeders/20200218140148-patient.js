'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 115,
          name: 'Sadiq Shah',
          createdAt: new Date(),
          updatedAt: new Date(),
          userType: 1,
          email: "sadiq@gmail.com",
          password: "123456",
          dob: "12-12-12"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
