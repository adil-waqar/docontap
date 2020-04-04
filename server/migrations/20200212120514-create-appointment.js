'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Appointments', {
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
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      assessmentId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: "Assessments",
            key: "id",
          }
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Appointments');
  }
};