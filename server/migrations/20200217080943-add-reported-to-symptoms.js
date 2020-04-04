'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Symptoms',
      'reported',
    Sequelize.BOOLEAN
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Symptoms',
      'reported'
    );
  }
};
