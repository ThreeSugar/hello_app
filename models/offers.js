var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var Offers = sequelize.define('Offers', {
    offer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    offer: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'users',
            key: 'username'
        }
    },
    item_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Items',
            key: 'item_id'
        }
    },
    seller_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
});

module.exports = sequelize.model('Offers', Offers);