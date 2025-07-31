
// routers
const router = require('../route/personRouter.js')
const express = require('express')
const cors = require('cors')
const path = require('path')


const app = express()

var corOptions = {
    origin: ['https://localhost:3001' , 'http://localhost:8080']
}


// middleware
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true }))


app.use('/api/persons',router)
app.use('/api/persons/images', express.static('upload'));


const PORT = process.env.PORT || 3000

//server
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})