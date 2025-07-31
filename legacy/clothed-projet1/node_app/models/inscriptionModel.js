
module.exports = (sequelize , DataTypes) => {

    const Inscription = sequelize.define("inscription" , {
        email:{
            type : DataTypes.STRING ,
            allowNull: false
        },
        password:{
            type : DataTypes.STRING ,
            allowNull: false 
        }
    } )

    return Inscription

}