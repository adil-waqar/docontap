'use strict';
module.exports = (sequelize, DataTypes) => {
  const DoctorSchedule = sequelize.define('DoctorSchedule', {
    doctorId: {
      type: DataTypes.INTEGER
    },
    day: {
      type: DataTypes.STRING
    },
    from: {
      type: DataTypes.STRING
    },
    to: {
      type: DataTypes.STRING
    }
  }, {});
  DoctorSchedule.associate = function(models) {
    
    DoctorSchedule.belongsTo(models.Doctor, {
      foriegnKey: 'doctorId',
      as: 'doctor',
    });
  };
  
  return DoctorSchedule;
};