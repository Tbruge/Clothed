const db = require('../models')

//model
const Review = db.reviews

//funxtions

//1. add review

const addReview = async (req, res) => {
    let data = {
        rating: req.body.rating,
        description: req.body.description
    }

    const review = await Review.create(data)
    res.status(200).send(review)
    console.log(review)
}


// 2. Get all reviews 

const getAllReviews = async(req,res) => {

    const reviews = await Review.findAll({})
    res.status(200).send(reviews)
    console.log(reviews)

}

module.exports = {
    addReview ,
    getAllReviews
}