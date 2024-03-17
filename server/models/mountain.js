'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mountain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mountain.hasMany(models.Booking, {
        foreignKey: 'MountainId'
      })
    }
  }
  Mountain.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty"
        },
        notNull: {
          msg: "Name cannot be empty"
        }
      }
    },
    mdpl: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "MDPL cannot be empty"
        },
        notNull: {
          msg: "MDPL cannot be empty"
        }
      }
    },
    region: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Region cannot be empty"
        },
        notNull: {
          msg: "Region cannot be empty"
        }
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Price cannot be empty"
        },
        notNull: {
          msg: "Price cannot be empty"
        }
      }
    },
    imgUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Image URL cannot be empty"
        },
        notNull: {
          msg: "Image URL cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Mountain',
  });
  return Mountain;
};