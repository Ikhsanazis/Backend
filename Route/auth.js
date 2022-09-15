
const Router = require('express').Router()
const controller = require('../Controller/authController')

// LOGIN
Router.post('/login', controller.login)

// REGISTER
Router.post("/register", controller.register);

module.exports = Router
