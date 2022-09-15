const Router = require("express").Router();
const controller = require("../Controller/usersController");
const upload = require("../Middleware/multer");

// GET USERS
Router.get("/users", controller.getUsers);

// GET USERS
Router.get("/users/:id", controller.getUserById);

// POST USERS
Router.post("/users/add", controller.addUser);

// PATCH USERS
Router.patch("/users/edit/:id", controller.editUser);
Router.patch("/users/editprofile/:id", upload, controller.editUserProfile);

// DELETE USERS ROUTES
Router.delete("/users/delete", controller.deleteUser);

module.exports = Router;

// middleware.verifyToken
