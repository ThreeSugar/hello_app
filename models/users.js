var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    resetPasswordExpires: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('An error occured: ', error));

// export User model for use in other files.
module.exports = User;

