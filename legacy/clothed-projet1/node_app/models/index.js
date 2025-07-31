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
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
db.inscription = require('./inscriptionModel.js')(sequelize,DataTypes)

db.sequelize.sync({force: false})
.then(()=> {
    console.log('yes re-syn done')
})



//1 to many relation
db.person.hasMany(db.reviews, {
    foreignkey: 'person_id',
    as: 'review'
})

db.reviews.belongsTo(db.person, {
    foreignkey: 'person_id',
    as: 'person'
})
module.exports = db