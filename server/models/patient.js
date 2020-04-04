'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNo: {
      type: DataTypes.STRING
    },
    isDiabetic: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSmoker: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    isHypertension: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    isObese: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Patient.associate = function(models) {
    
    Patient.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      // onDelete: 'CASCADE'
    });

    Patient.hasMany(models.Appointment, {
      foreignKey: 'patientId',
      as: 'appointments',
      sourceKey: 'id'
    });

    Patient.hasMany(models.Review, {
      foreignKey: 'patientId',
      as: 'reviews'
    });

    Patient.hasMany(models.Assessment, {
      foreignKey: 'assessmentId',
      as: 'assessments',
      sourceKey: 'id'
    });

  };
  return Patient;
};

