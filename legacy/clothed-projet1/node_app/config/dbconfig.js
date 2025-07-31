module.exports = {
    host: 'localhost' ,
    user : 'root',
    password : '',
    database : 'cloth',
    dialect: 'mysql',


    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
