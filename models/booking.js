'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
      Booking.belongsTo(models.Mountain, {
        foreignKey: 'MountainId'
      });
    }
  }
  Booking.init({
    date: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Date cannot be empty"
        },
        notNull: {
          msg: "Date cannot be empty"
        }
      }
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Amount cannot be empty"
        },
        notNull: {
          msg: "Amount cannot be empty"
        }
      }
    },
    isPay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    },
    MountainId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "MountainId cannot be empty"
        },
        notNull: {
          msg: "MountainId cannot be empty"
        }
      }
    },
    bookingId: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};