'use strict';
const { Model, DataTypes } = require('sequelize'); // ✅ Ensure DataTypes is correctly imported

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user', // Default role is 'user'
      },
      resetToken: {
        type: DataTypes.STRING, // ✅ Fixed from Sequelize.STRING to DataTypes.STRING
        allowNull: true,
      },
      resetTokenExpiration: {
        type: DataTypes.DATE, // ✅ Fixed from Sequelize.DATE to DataTypes.DATE
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
