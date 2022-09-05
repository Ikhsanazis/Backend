const Router = require('express').Router()
const controller = require('../Controller/usersController')
// const middleware = require('../middleware/verifyToken')

// GET USERS
Router.get('/users',  controller.getUsers)

// POST USERS
Router.post('/users/add', controller.addUser)

// PATCH USERS
Router.patch('/users/edit', controller.editUser)

// DELETE USERS ROUTES
Router.delete('/users/delete', controller.deleteUser)

module.exports = Router

// middleware.verifyToken
