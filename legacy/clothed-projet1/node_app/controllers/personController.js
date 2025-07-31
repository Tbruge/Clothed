const { Op } = require("sequelize");
const db = require('../models')

// create the main model 
const Person = db.person
const Review = db.reviews
const Inscription = db.inscription



/// main work 


//  create person

const addPerson = async (req , res ) => {

    try{
        const {nom,prenom,email,mot_de_passe } = req.body

        const data = await Person.findAll({
            where: { email : email}

        })
        if(data.length > 0){ 
            res.status(200).send('le compte existe déjà')
        }else{
            let info = {
                nom: nom,
                prenom: prenom,
                email: email,
                password: mot_de_passe
            }
        
            const person = await Person.create(info)
            console.log(person)
            res.status(200).send("valid")

        }
    }catch(error)
    {
       console.error('Error in checkPerson:',error);
       res.status(500).send('Internal Server error')
    }
 
}

// 2. get single person

const getOnePerson = async (req , res) =>  {

    let id = req.params.id
    let person = await Person.findOne({where: { id: id }})
    res.status(200).send(person)
} 

// 3. update person

const updatePerson = async (req , res) =>  {

    let id = req.params.id
    const person = await Person.update(req.body, {where : {id: id}})
    res.status(200).send(person)
} 

// 4. delete person by id

const deletePerson = async (req , res) => {

    let id = req.params.id
    await Person.destroy({where: {id: id}})
    res.status(200).end('person has been remove')
}


//5. connect one to many relation and reviews

const getPersonReviews = async (req , res) => {
    const data = await Person.findAll({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: 2}
    })
    res.status(200).send(data)
}

//6. check if user existe in database 
const checkPerson = async (req , res) => {
    try{ 

        const {email , mot_de_passe} = req.body

        const data = await Person.findAll({
            where: { email : email , 
            password: mot_de_passe}

        })

        if (data.length > 0) {
             res.status(200).send("valid")
         } else {
             res.status(200).send("compte introuvable")
         }
        
    } catch(error)
 {
    console.error('Error in checkPerson:',error);
    res.status(500).send('Internal Server error')
 }    
};

//7. add user in inscritpion

const addInscription = async (req , res ) => {

    let info = {
        email: req.body.email,
        password: req.body.password
    }

    const inscription = await Inscription.create(info)
    res.status(200).send(inscription)
    console.log(inscription)
}

module.exports = {
    addPerson,
    getOnePerson,
    deletePerson,
    updatePerson,
    getPersonReviews,
    checkPerson,
    addInscription
}