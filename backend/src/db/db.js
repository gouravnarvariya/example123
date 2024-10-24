const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require("path");

const sequelize = new Sequelize('test', 'postgres', '1234', {
  host: 'localhost',
  dialect:  'postgres',
  logging: false
});

const aunthenticate = async()=>{try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

aunthenticate()

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const modelDir = path.join(__dirname, '../models')
const modelFiles = fs.readdirSync(modelDir)


modelFiles.forEach((file) => {
    const model = require(path.join(modelDir, file))(sequelize,DataTypes)
    db[model.name] = model
})



db.sequelize.sync({ force: false, alter: true }).then(async () => {
    console.log("Database schema has been updated!");
  });




module.exports = db