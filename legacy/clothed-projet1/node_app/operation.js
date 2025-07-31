module.exports = (app) => {
    app.get('', (req,res) => {
        pool.getConnection((err,connection) => {
            if(err) throw err
    
    
            //query
            connection.query('SELECT * from person',(err,rows) => {
                connection.release()
    
                if(!err){
                    res.send(rows)
                }else {
                    console.log(err)
                }
            })
        })
    })
}