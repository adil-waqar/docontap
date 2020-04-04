'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Appointment.associate = function(models) {
  
    Appointment.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      as: 'patient',
      targetKey: 'id'
    });

    Appointment.belongsTo(models.Doctor, {
      foreignKey: 'doctorId',
      as: 'doctor',
      targetKey: 'id'
    });

    Appointment.belongsTo(models.Assessment, {
      foriegnKey: 'assessmentId',
      as: 'assessment',
      targetKey: 'id'
    });
  
  };
  
  return Appointment;
};