'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospital:{
      type: DataTypes.STRING,
      allowNull: false
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialization: {
     type: DataTypes.STRING,
     allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  }, {});
  Doctor.associate = function(models) {
      
      Doctor.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      Doctor.hasMany(models.Appointment, {
        foreignKey: 'doctorId',
        as: 'appointments',
        sourceKey: 'id'
      });

      Doctor.hasMany(models.Review, {
        foreignKey: 'doctorId',
        as: 'reviews'
      });

      Doctor.hasMany(models.DoctorSchedule, {
        foreignKey: 'doctorId',
        as: 'doctorSchedules',
        sourceKey: 'id'
      });

  };
  return Doctor;
};