const Router = require('express').Router()
const controller = require('../Controller/recipesController')
const upload = require('../Middleware/multer')

// GET RECIPES ROUTES
Router.get('/recipes', controller.getRecipes)

// GET RECIPES ROUTES
Router.get('/popular', controller.getPopular)

// GET RECIPES ROUTES
Router.get('/recipes/:recipe_id', controller.getDetailRecipes)

// GET RECIPES ROUTES
Router.get('/recipes/:user_id', controller.getUsersRecipes)

// FIND RECIPES
Router.get('/recipes/find', controller.findRecipes)

// FIND NEW RECIPES
Router.get('/newrecipe', controller.newRecipes)

// pagination
Router.get('/recipes/pagination', controller.pagination)

// POST RECIPES
Router.post('/recipes/add/:id',upload, controller.addRecipes)

// PATCH RECIPES
Router.patch('/edit/:recipe_id',upload, controller.editRecipes)

// DELETE RECIPES ROUTES
Router.delete('/recipes/delete', controller.deleteRecipes)

module.exports = Router

