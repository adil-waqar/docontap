'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [5,1024]
    },
    userType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    
    User.hasOne(models.Patient, {
      foreignKey: "userId",
      as: "patient",
      onDelete: "CASCADE"
    });

    User.hasOne(models.Doctor, {
      foreignKey: "userId",
      as: "Doctor"
    });

  };
  return User;
};