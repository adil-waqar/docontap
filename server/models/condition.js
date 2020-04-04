'use strict';
module.exports = (sequelize, DataTypes) => {
  const Condition = sequelize.define('Condition', {
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    probability: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {});
  Condition.associate = function(models) {
    
    Condition.belongsTo(models.Assessment, {
      foreignKey: 'assessmentId',
      onDelete: 'CASCADE',
      targetKey: 'id'
    });

  };
  return Condition;
};