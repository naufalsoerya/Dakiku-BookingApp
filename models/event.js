'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  }
  Event.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty"
        },
        notNull: {
          msg: "Title cannot be empty"
        }
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Description cannot be empty"
        },
        notNull: {
          msg: "Description cannot be empty"
        }
      }
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "UserId cannot be empty"
        },
        notNull: {
          msg: "UserId cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};