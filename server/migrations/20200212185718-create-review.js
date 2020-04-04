'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: "Patients",
            key: "id",
          }
      },
      doctorId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: "Doctors",
            key: "id",
          }
      },
      time: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};