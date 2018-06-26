var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const Items = sequelize.define('Items', {
    item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        trim: true
    },
    item_name: {
        type: Sequelize.STRING
    },
    item_desc: {
        type: Sequelize.STRING
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
    }
});


// // force: true will drop the table if it already exists
// Items.sync({logging: console.log}).then(() => {
//     // Table created
//     console.log("items table synced");
// });

module.exports = sequelize.model('Items', Items);

