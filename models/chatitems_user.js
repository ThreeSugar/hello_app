var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var Users = require('../models/users');
var ChatItems = require('../models/chatitems');

Users.hasMany(ChatItems, {foreignKey: 'user_id', constraints: false});
ChatItems.belongsTo(Users, {foreignKey: 'user_id', constraints: false});

sequelize.sync({force: false}).then(function () {
    console.log("ChatItems + Users DB Configured");
});

module.exports = {Users, ChatItems};