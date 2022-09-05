const Router = require('express').Router()
const controller = require('../Controller/usersController')
// const middleware = require('../middleware/verifyToken')
const upload = require('../Middleware/multer')

// GET USERS
Router.get('/users',  controller.getUsers)

// POST USERS
Router.post('/users/add', controller.addUser)

// PATCH USERS
Router.patch('/users/edit/:id',upload, controller.editUser)

// DELETE USERS ROUTES
Router.delete('/users/delete', controller.deleteUser)

module.exports = Router

// middleware.verifyToken
