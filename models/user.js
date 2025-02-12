const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
// In the above code, we first import the DataTypes class from the sequelize package and the sequelize instance from the config file. We then define a User model with two fields: username and password. The username field is of type STRING, is required, and must be unique. The password field is also of type STRING and is required. Finally, we export the User model. This model will be used to interact with the users table in the database.