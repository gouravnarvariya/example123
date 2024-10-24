

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define("user" , {
    id: {
        type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    } ,
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type : DataTypes.STRING
    }
   
})
return User
}