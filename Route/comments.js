const Router = require('express').Router()
const controller = require('../Controller/commentsController')

// GET RECIPES
Router.get('/comments', controller.getComments)

// GET REVIEWS
Router.get('/comments/review', controller.reviews)

// POST COMMENTS
Router.post('/comments/add', controller.addComments)

module.exports = Router
