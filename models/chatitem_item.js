var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var ChatItems = require('../models/chatitems');
var Items = require('../models/items');

Items.hasMany(ChatItems, {foreignKey: 'item_id'});
ChatItems.belongsTo(Items, {foreignKey: 'item_id'});

sequelize.sync({force: false}).then(function () {
    console.log("ChatItems + Items DB Configured");
});
module.exports = {Items, ChatItems};