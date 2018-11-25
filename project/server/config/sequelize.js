const Sequelize = require('sequelize')
const TicketReasonModel = require('../models/ticketreason')
const TicketModel = require('../models/ticket')
const UserModel = require('../models/user')
const PoliceModel = require('../models/police')
const DriverModel = require('../models/driver')

var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}

const sequelize = new Sequelize('ticketing_system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
        operatorsAliases: false
    }
  });


const TicketReason = TicketReasonModel(sequelize, Sequelize);
const Ticket = TicketModel(sequelize, Sequelize);
const Police = PoliceModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Driver = DriverModel(sequelize, Sequelize);

module.exports = {
  TicketReason,
  Ticket,
  Police,
  User,
  Driver
}