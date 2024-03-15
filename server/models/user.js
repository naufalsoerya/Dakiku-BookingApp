'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username cannot be empty"
        },
        notNull: {
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        msg: "Email already registered"
      },
      validate: {
        notEmpty: {
          msg: "Email cannot be empty"
        }, 
        notNull: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Must be an email format"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty"
        },
        notNull: {
          msg: "Password cannot be empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};