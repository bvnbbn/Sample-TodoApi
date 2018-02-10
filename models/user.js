'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, {

      foreignKey: 'userId',
      as: 'todos'

    });

    // associations can be defined here

  };

  return User;
};