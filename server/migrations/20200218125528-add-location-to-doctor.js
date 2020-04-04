'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'Doctors',
        'location',
      Sequelize.STRING
        );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Doctors',
      'location'
    );
  }
};
