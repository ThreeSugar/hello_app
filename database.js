const Sequelize = require('sequelize');
var sequelizeTransforms = require('sequelize-transforms');

const sequelize = new Sequelize('login', 'bankdb', '12345', {
  host: 'localhost',
  dialect: 'mssql',
  operatorsAliases: false,
  dialectOptions: {
    instanceName: 'SQLEXPRESS'
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelizeTransforms(sequelize);

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;