

module.exports = (sequelize, DataTypes) => {
const Product = sequelize.define("product" , {
    id: {
        type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    } ,
    name: {
        type: DataTypes.STRING
    },
   
})
return Product
}