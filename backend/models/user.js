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
        as: 'Requester',
        onDelete: 'cascade',
        through: 'FriendRequests',
        foreignKey: 'requesterId'
      });
      User.belongsToMany(models.User, {
        as: 'Addressee',
        onDelete: 'cascade',
        through: 'FriendRequests',
        foreignKey: 'addresseeId'
      });

      User.belongsToMany(models.User, {
        as: 'User',
        onDelete: 'cascade',
        through: 'friends',
        foreignKey: 'userId'
      });
      User.belongsToMany(models.User, {
        as: 'Friend',
        onDelete: 'cascade',
        through: 'friends',
        foreignKey: 'friendId'

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
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};