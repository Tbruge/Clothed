
module.exports = (sequelize , DataTypes) => {

    const Image = sequelize.define("image" , {
        email:{
            type : DataTypes.STRING ,
            allowNull: false
        },
        img:{
            type : DataTypes.STRING,
            allowNull: false 
        },
        category:{
            type : DataTypes.STRING,
            allowNull: false 
        },
        name:{
            type : DataTypes.STRING,
            allowNull: false 
        }
    } )

    return Image

}