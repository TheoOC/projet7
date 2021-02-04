'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        onDelete: 'cascade',
        foreignKey: {
          allowNull: false
        }
      });
      Comment.belongsTo(models.Post, {
        onDelete: 'cascade',
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Comment.init({
    textContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};