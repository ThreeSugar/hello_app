var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;


const ChatItems = sequelize.define('ChatItems', {
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    seller_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    item_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Items',
            key: 'item_id'
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

// ChatItems.sync({force: true, logging: console.log}).then(() => {
//     // Table created
//     console.log("chatitems table synced");
// });

module.exports = sequelize.model('ChatItems', ChatItems);