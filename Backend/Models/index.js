const dbConfig =require('../dbConfig');
const {Sequelize,DataTypes}=require('sequelize')

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
   dialect:dbConfig.dialect,
   pool:{
       max:dbConfig.pool.max,
       min:dbConfig.pool.min,
       acquire:dbConfig.pool.acquire,
       idle:dbConfig.pool.idle
   }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users_table = require("./usersModel")(sequelize, DataTypes);
db.emp_basic_details = require("./basicDetailsModel")(sequelize, DataTypes);
db.emp_education_details = require("./educationModel")(sequelize, DataTypes);
db.emp_employement_details = require("./employementModel")(sequelize, DataTypes);
db.emp_address_details = require("./addressModel")(sequelize, DataTypes);
db.emp_miscellaneous_details = require("./miscellaneousModel")(sequelize, DataTypes);

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

module.exports = db;