const db = require('../models')
const assert = require('assert');

// create the main model 
const Person = db.person
const Image = db.image



/// main work 


// 1. Ajoute une nouvelle personne à la base de données si elle n'existe pas déjà.
/**
 * Ajoute une nouvelle personne à la base de données si elle n'existe pas déjà.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 */
const addPerson = async (req , res ) => {
    try{
        // Obtient les données de la requête
        const {nom,prenom,email,mot_de_passe } = req.body
        assert(email, 'Email is required');

        // Vérifie si l'utilisateur existe déjà dans la base de données
        const data = await Person.findAll({
            where: { email : email}
        })
        assert(Array.isArray(data), 'Expected data to be an array');

        if(data.length > 0){ 
            res.status(200).send('le compte existe déjà')
        }else{
            // Si l'utilisateur n'existe pas, crée un nouveau profil
            let info = {
                nom: nom,
                prenom: prenom,
                email: email,
                password: mot_de_passe
            }
        
            const person = await Person.create(info)
            assert(person, 'Failed to create person');
            res.status(200).send("valid")

        }
    }catch(error)
    {
       console.error('Error in checkPerson:',error);
       res.status(500).send('Internal Server error')
    }
}

// 2. Met à jour les informations d'une personne dans la base de données en fonction de son identifiant.
/**
 * Met à jour les informations d'une personne dans la base de données en fonction de son identifiant.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 */
const updatePerson = async (req , res) =>  {

    try {
        const id = req.params.id 
        const {name , prenom , mot_de_passe } = req.body 

        const fieldToUpdate = { };

        if(name) {
            fieldToUpdate.nom = name ;
        }
        if(prenom){
            fieldToUpdate.prenom = prenom ;
        }
        if(mot_de_passe){
            fieldToUpdate.password = mot_de_passe ;
        }

        // Vérifie si des champs à mettre à jour sont fournis
        assert(Object.keys(fieldToUpdate).length, 'No fields provided for update');

        // Effectue la mise à jour de la personne dans la base de données
        await Person.update(fieldToUpdate, {where : {id: id}})

        // Récupère les informations mises à jour de la personne
        const updatePerson = await Person.findOne( {where: {id : id}})
        assert(updatePerson, 'Failed to find the updated person');
        res.status(200).send(updatePerson);
    }catch(error){
        console.error('Erreur lors de la mise à jour de la personne ', error)
        res.status(500).send('Erreur lors de la mise à jour de la personne')
    }    
    
} 

// 3. Récupère le nom d'une personne à partir de son identifiant d'image.
/**
 * Récupère le nom d'une personne à partir de son identifiant d'image.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 */
const getNameByID = async (req , res) => {

    let id = req.params.id
    assert(id, 'Image ID is required');

    try {
        const image = await Image.findByPk(id); 
        assert(image, 'Image not found');
        // Récupère toutes les images associées à cette personne
        const person = await Person.findAll({ where: { email : image.email} });
        assert(person, 'Person not found');

        res.status(200).json( person );
        } catch (error) {
        console.error('Error fetching images for person:', error);
        res.status(500).json({ message: 'Internal server error' });
        }

}

// 4. Récupère toutes les images associées à une personne en fonction de son identifiant.
/**
 * Récupère toutes les images associées à une personne en fonction de son identifiant.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 */
const getPersonImage = async (req , res) => {

    const id  = req.params.id
    assert(id, 'Person ID is required');
    
    try {

        const person = await Person.findByPk(id); 
        assert(person, 'Person not found');

        // Récupère toutes les images associées à cette personne
        const images = await Image.findAll({ where: { email : person.email} });
        assert(Array.isArray(images), 'Expected images to be an array');

        res.status(200).json( images );
    } catch (error) {
    console.error('Error fetching images for person:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

// 5. Vérifie si un utilisateur existe dans la base de données en fonction de son adresse e-mail et de son mot de passe.
/**
 * Vérifie si un utilisateur existe dans la base de données en fonction de son adresse e-mail et de son mot de passe.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 */
const checkPerson = async (req , res) => {
    try{ 

        const {email , mot_de_passe} = req.body;
        assert(email && mot_de_passe, 'Email and password are required');

        // Vérifie si l'utilisateur existe dans la base de données
        const info = await Person.findOne({
            where: { email : email 
                , password: mot_de_passe}

        })

        // Renvoie un statut "valide" avec les informations de la personne si elle existe, sinon renvoie un message indiquant que le compte est introuvable
        if (info) {
             res.status(200).send({status:"valid", info})
         } else {
             res.status(200).send("compte introuvable")
         }
        
    } catch(error)
 {
    console.error('Error in checkPerson:',error);
    res.status(500).send('Internal Server error')
 }    
};



module.exports = {
    addPerson,
    updatePerson,
    getPersonImage,
    checkPerson,
    getNameByID
}