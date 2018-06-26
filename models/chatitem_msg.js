var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var ChatItems = require('../models/chatitems');
var Messages = require('../models/messages');

ChatItems.hasMany(Messages, {foreignKey: 'user_id', constraints: false, onDelete: 'cascade', hooks: true});
Messages.belongsTo(ChatItems, {foreignKey: 'user_id', constraints: false});

sequelize.sync({force: false}).then(function () {
    console.log("ChatItems + Messages DB Configured");
});

module.exports = {Messages, ChatItems};