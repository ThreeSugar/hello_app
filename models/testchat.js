var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var TestChat = sequelize.define('testchat', {
    sender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiver: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('chat table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('An error occured: ', error));

module.exports = TestChat;