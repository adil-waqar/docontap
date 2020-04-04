'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assessment = sequelize.define('Assessment', {
    
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {});
  Assessment.associate = function(models) {
    
    Assessment.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      onDelete: 'CASCADE',
      targetKey: 'id'
    });

    Assessment.hasMany(models.Symptom, {
      foreignKey: 'assessmentId',
      as: 'symptoms',
      sourceKey: 'id'
    });

    Assessment.hasMany(models.Condition, {
      foreignKey: 'assessmentId',
      as: 'conditions',
      sourceKey: 'id'
    });

    Assessment.hasOne(models.Appointment, {
      foreignKey: "assessmentId",
      as: "appointment",
      onDelete: "CASCADE"
    });

  };
  return Assessment;
};