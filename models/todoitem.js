'use strict';
module.exports = (sequelize, DataTypes) => {
  var TodoItem = sequelize.define('TodoItem', {
    content:{

     type:DataTypes.STRING,
     allowNull:false,

    },
    complete: { 
      type:DataTypes.BOOLEAN,
      defaultValue:false,
    },

    todoId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'todo',
        key: 'id'
      }
    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        TodoItem.belongsTo(models.Todo, {

          foreignKey: 'todoId',
          onDelete: 'CASCADE',
          allowNull:false,

        });
      }
    }
  });
  return TodoItem;
};