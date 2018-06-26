var myDatabase = require('../database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const ChatInit = sequelize.define('ChatInit', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    item_id: {
        type: Sequelize.INTEGER,
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
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },   // user_id of seller
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }, // username of seller

    user_id_init: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }, // user_id of buyer

    username_init: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }, //username of buyer
})

ChatInit.sync().then(() => {
    // Table created
    console.log("chatinit table synced");
});

module.exports = sequelize.model('ChatInit', ChatInit);