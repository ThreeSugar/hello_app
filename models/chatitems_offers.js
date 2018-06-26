var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var ChatItems = require('../models/chatitems');
var Offers = require('../models/offers');

ChatItems.hasMany(Offers, {foreignKey: 'user_id', constraints: false, onDelete: 'cascade', hooks: true});
Offers.belongsTo(ChatItems, {foreignKey: 'user_id', constraints: false});

sequelize.sync({force: false}).then(function () {
    console.log("ChatItems + Offers DB Configured");
});
module.exports = {Offers, ChatItems};