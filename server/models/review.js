'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    patientId: {
      type: DataTypes.INTEGER
    },
    doctorId: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {});
  Review.associate = function(models) {
    
    Review.belongsTo(models.Doctor, {
      foreignKey: 'doctorId',
      onDelete: 'CASCADE',
    });

    Review.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      onDelete: 'CASCADE',
    });

  };

  return Review;
};