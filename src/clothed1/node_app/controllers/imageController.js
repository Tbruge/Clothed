const db = require('../models')
const { Op } = require('sequelize');
const assert = require('assert');


// create the main model
const Person = db.person
const Image = db.image



/// main work

//1. récupère tout les images

/**
 * Récupère toutes les images depuis la base de données.
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} res - Réponse HTTP sortante.
 */
const getImages = async (req, res) => {
    try {
        
        const images = await Image.findAll(); // Récupérer les données des images depuis la base de données

        // Transformation des données en objets avec URL complète
        const imageUrls = images.map(image => ({
            id: image.id,
            url: `${req.protocol}://${req.get('host')}/api/persons/images/${image.img}`,
            email: image.email,
            category: image.category,
            name: image.name
        }));

        res.status(200).json(imageUrls); // Réponse avec les URLs des images
    } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

 /**
 * Ajoute une image à la base de données.
 * @param {Object} req - Requête HTTP entrante contenant les données de l'image.
 * @param {Object} res - Réponse HTTP sortante.
 */
const addImage = async (req, res) => {
    try {
        assert(req.file, 'No image file uploaded');
        
        const articleCategory = req.body.articleCategory;
        const articleMail = req.body.articleMail;
        const image = req.file;

        const info = {
            name: image.originalname,
            img: image.filename,
            category: articleCategory,
            email: articleMail
        };

        const images = await Image.create(info); // Création de l'entrée dans la base de données

        res.status(200).json({ message: 'Image upload and save successfully', articleCategory, articleMail });

    } catch (error) {
        console.error('Erreur lors du traitement de l\'image:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};


//3 fait un recherche par categorie
/**
 * Récupère les images d'une catégorie spécifique depuis la base de données.
 * @param {Object} req - Requête HTTP entrante contenant le nom de la catégorie.
 * @param {Object} res - Réponse HTTP sortante.
 */
const getImageByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        assert(typeof category === 'string', 'Expected category to be a string');
        const images = await Image.findAll({
            where: { category: category }
        });

        const imageUrls = images.map(image => ({
            id: image.id,
            url: `${req.protocol}://${req.get('host')}/api/persons/images/${image.img}`,
            email: image.email,
            category: image.category,
            name: image.name
        }));

        res.status(200).json(imageUrls);
    } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

//4 fait une recherche par le nom
/**
 * Recherche les images par nom.
 * @param {Object} req - Requête HTTP entrante contenant le nom à rechercher.
 * @param {Object} res - Réponse HTTP sortante.
 */
const searchByName = async (req, res) => {
    const names = req.params.name;
    try {
        assert(typeof names === 'string', 'Expected name to be a string');
        const images = await Image.findAll({ where: { name: { [Op.like]: `%${names}%` } } });
        const imageUrls = images.map(image => ({
            id: image.id,
            url: `${req.protocol}://${req.get('host')}/api/persons/images/${image.img}`,
            email: image.email,
            category: image.category,
            name: image.name
        }));
        res.status(200).json(imageUrls);
    } catch (error) {
        console.error('Erreur lors de la recherche d\'images par nom:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

//5 fait une recherche par l'identifiant 

/**
 * Récupère une image à partir de son identifiant.
 * @param {Object} req - Requête HTTP entrante contenant l'identifiant de l'image.
 * @param {Object} res - Réponse HTTP sortante.
 */
const getImageById = async (req, res) => {
    const id = req.params.id;
    try {
        assert(id, 'No ID provided');
        // Récupérer les données de l'image depuis la base de données en fonction de l'identifiant
        const images = await Image.findAll({
            where: { id: id }
        });

        // Transformation des données en objets avec URL complète
        const imageUrls = images.map(image => ({
            id: image.id,
            url: `${req.protocol}://${req.get('host')}/api/persons/images/${image.img}`,
            email: image.email,
            category: image.category,
            name: image.name
        }));

        res.status(200).json(imageUrls); // Réponse avec les données de l'image correspondante à l'identifiant
    } catch (error) {
        console.error('Erreur lors de la récupération des images par identifiant:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

//6 fait une recherche par email
/**
 * Récupère les images associées à une adresse e-mail spécifique.
 * @param {Object} req - Requête HTTP entrante contenant l'adresse e-mail.
 * @param {Object} res - Réponse HTTP sortante.
 */
const getImageByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        assert(typeof email === 'string', 'Expected email to be a string');
        // Récupérer les données des images depuis la base de données en fonction de l'adresse e-mail
        const images = await Image.findAll({
            where: { email: email }
        });

        // Transformation des données en objets avec URL complète
        const imageUrls = images.map(image => ({
            id: image.id,
            url: `${req.protocol}://${req.get('host')}/api/persons/images/${image.img}`,
            email: image.email,
            category: image.category,
            name: image.name
        }));

        res.status(200).json(imageUrls); // Réponse avec les images associées à l'adresse e-mail spécifiée
    } catch (error) {
        console.error('Erreur lors de la récupération des images par e-mail:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

//7 supprime une image
/**
 * Supprime une image de la base de données en fonction de son identifiant.
 * @param {Object} req - Requête HTTP entrante contenant l'identifiant de l'image à supprimer.
 * @param {Object} res - Réponse HTTP sortante.
 */
const deleteImage = async (req, res) => {
    const id = req.params.id;
    try {
        assert(id, 'No ID provided');
        await Image.destroy({ where: { id: id } }); // Suppression de l'image de la base de données en fonction de l'identifiant
        res.status(200).end('L\'image a été supprimée avec succès');
    } catch (error) {
        console.error('Impossible de supprimer l\'image:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};


//8 modifie le nom d'une image 
/**
 * Met à jour le nom d'une image dans la base de données en fonction de son identifiant.
 * @param {Object} req - Requête HTTP entrante contenant l'identifiant de l'image et le nouveau nom.
 * @param {Object} res - Réponse HTTP sortante.
 */
const updateImage = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    try {
        assert(id && name, 'ID or new name not provided');
        let image = await Image.findByPk(id); // Recherche de l'image par son identifiant
        assert(image, "L'image n'a pas été trouvée");
        await image.update({ name }); // Mise à jour du nom de l'image dans la base de données
        res.status(200).json({ message: "Le nom de l'image a été mis à jour avec succès", image });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du nom de l\'image:', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};


module.exports = {
    getImages,
    addImage,
    getImageByCategory,
    searchByName,
    getImageById,
    getImageByEmail,
    deleteImage,
    updateImage
};
