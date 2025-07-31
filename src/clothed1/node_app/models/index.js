const dbconfig = require('../config/dbconfig');

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.user,
    dbconfig.password, {
        host: dbconfig.host,
        dialect: dbconfig.dialect,

        pool: {
            max: dbconfig.pool.max ,
            min: dbconfig.pool.min ,
            macquire: dbconfig.pool.acquire ,
            idle: dbconfig.pool.idle

        }
    }
    
)

sequelize.authenticate()
.then(()=> {
    console.log('connected ...')
})
.catch(err => {
    console.log('Error' + err )
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.person = require('./personModel.js')(sequelize, DataTypes)
db.image = require('./imageModel.js')(sequelize,DataTypes)

db.sequelize.sync({force: false})
.then(()=> {
    console.log('yes re-syn done')
})



//1 to many relation

db.person.hasMany(db.image , {
    foreignKey: 'email',
    as:'images'
})

db.image.belongsTo(db.person , {
    foreignKey: 'email',
    as: 'persons'
})

module.exports = db