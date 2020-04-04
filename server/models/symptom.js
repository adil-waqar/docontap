'use strict';
module.exports = (sequelize, DataTypes) => {
  const Symptom = sequelize.define('Symptom', {
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  Symptom.associate = function(models) {
    
    Symptom.belongsTo(models.Assessment, {
      foreignKey: 'assessmentId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });

  };
  return Symptom;
};