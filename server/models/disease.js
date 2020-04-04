'use strict';
module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define('Disease', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {timestamps: false});
  Disease.associate = function(models) {
    // associations can be defined here
  };
  return Disease;
};