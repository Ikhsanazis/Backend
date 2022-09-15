const Router = require('express').Router()
const controller = require('../Controller/commentsController')

// GET RECIPES
Router.get('/comments', controller.getComments)
Router.get('/comments/:recipe_id', controller.getCommentById)

// POST COMMENTS
Router.post('/comments/add/:user_id/:recipe_id', controller.addComments)



module.exports = Router

// // GET REVIEWS
// Router.get('/comments/review', controller.reviews)
// // POST COMMENTS
// Router.post('/comments/add', controller.addComments)