const Router = require('express').Router()
const controller = require('../Controller/recipesController')
const upload = require('../Middleware/multer')

// GET RECIPES ROUTES
Router.get('/recipes', controller.getRecipes)

// FIND RECIPES
Router.get('/recipes/find', controller.findRecipes)

// FIND NEW RECIPES
Router.get('/recipes/newrecipe', controller.newRecipes)

// pagination
Router.get('/recipes/pagination', controller.pagination)

// POST RECIPES
Router.post('/recipes/add', upload, controller.addRecipes)

// PATCH RECIPES
Router.patch('/recipes/edit', controller.editRecipes)

// DELETE RECIPES ROUTES
Router.delete('/recipes/delete', controller.deleteRecipes)

module.exports = Router
// ,upload.uploadVideos
