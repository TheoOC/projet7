'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        onDelete: 'cascade',
        foreignKey: {
          allowNull: false
        }
      });
      User.hasMany(models.Comment, {
        onDelete: 'cascade',
        foreignKey: {
          allowNull: false
        }
      });

      User.belongsToMany(models.User, {
        as: 'friends',
        foreignKey: 'user_id',
        through: models.UsersFriends
      });
      User.belongsToMany(models.User, {
        as: 'userFriends',
        foreignKey: 'friend_id',
        through: models.UsersFriends
      });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};