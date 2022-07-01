
const Router = require('express').Router()
const controller = require('../Controller/authController')

// LOGIN
Router.post('/login', controller.login)

module.exports = Router
