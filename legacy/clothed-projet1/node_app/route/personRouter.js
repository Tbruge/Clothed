// importing controllers

const personController = require('../controllers/personController')
const reviewController = require('../controllers/reviewController')


//router
const router = require('express').Router()


// use router
router.post('/addPerson', personController.addPerson)



// review url and controller
router.get('/allReview', reviewController.getAllReviews)
router.post('/addReview', reviewController.addReview)


// get product review
router.get('/getPersonReviews', personController.getPersonReviews)

// check and add inscription
router.post('/checkPerson',personController.checkPerson)
router.post('/addInscription',personController.addInscription)




//person router
router.get('/:id', personController.getOnePerson)
router.put('/:id', personController.updatePerson)
router.delete('/:id', personController.deletePerson)

module.exports = router;
