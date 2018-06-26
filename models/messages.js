var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

var Messages = sequelize.define('Messages', {
    message_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },

    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    
    from: {
        type: Sequelize.STRING,
        allowNull: false
    },

    to: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Items',
            key: 'item_id',
        }
    },
    seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});



// Messages.sync({logging: console.log}).then(() => {
//     // Table created
//     console.log("messages table synced");
// });
module.exports = sequelize.model('Messages', Messages);

