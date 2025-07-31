const personController = require('../controllers/personController')
const reviewController = require('../controllers/reviewController')

const express = require('express')
const cors = require('cors')


const app = express()

var corOptions = {
    origin: ['https://localhost:3001' , 'http://localhost:8080']
}



// middleware
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true }))


// routers
const router = require('../route/personRouter.js')
app.use('/api/persons',router)


//reception formulaire
// app.get('/api/persons/checkPerson', (req , res) => {
//     const formData = req.body ;
//     console.log('Données du formulare recues:', formData);
//     res.send('donées récu avec success')
// });


// procède à la vérification de l'enregistrement d'un utilisateur 
// app.post('/api/persons/checkPerson', (req, res) => {
//     const { email, mot_de_passe } = req.body;
//     personController.checkPerson

    
//     console.log('Données du formulaire reçues :', req.body);
//     res.status(200).send('Données reçues ');
// });

// reception formulaire
app.post('/api/persons/checkPerson',personController.checkPerson)


//ajout d'un utilisateur dans une base de donnée 
app.post('/api/persons/addPerson',personController.addPerson)



// testing api
app.get('/', (req,res)=> {
    res.json({message: 'hello from api'})
})

const PORT = process.env.PORT || 3000

//server
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})