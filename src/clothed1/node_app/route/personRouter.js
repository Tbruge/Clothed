// importing controllers

const personController = require('../controllers/personController')
const imageController = require('../controllers/imageController')


//--------------------------------------------------------

const multer = require ('multer')
const path = require('path')

//middlexare pour gerer les données du formulaire
const storage = multer.diskStorage({
    destination: function (req , file , cb){
        cb(null , 'upload/')

    },
    filename: (req , file , cb) => {
        console.log(file)
        cb(null , file.fieldname+ '-' + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({storage: storage}) 

//------------------------------------------------------


//router
const router = require('express').Router()


// person 
router.post('/addPerson', personController.addPerson)
router.post('/checkPerson',personController.checkPerson)
router.get('/image/search/person/:id',personController.getNameByID)
router.get('/getPersonImage/:id', personController.getPersonImage)



// get , check, add image 
router.post('/addImage',upload.single('image') , imageController.addImage)
router.get('/images', imageController.getImages) ; 
router.get('/image/:category',imageController.getImageByCategory)
router.get('/images/search/:name',imageController.searchByName)
router.get('/image/search/:id',imageController.getImageById)
router.get('/image/searche/:email',imageController.getImageByEmail)
router.delete('/image/delete/:id',imageController.deleteImage)
router.put('/image/update/:id', imageController.updateImage)


//person router
router.put('/update/:id', personController.updatePerson)

module.exports = router;
