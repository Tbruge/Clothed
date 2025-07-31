module.exports = (sequelize , DataTypes) => {

    const Person = sequelize.define("person", {
        nom:{
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom:{
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return Person
}