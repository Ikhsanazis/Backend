const Router = require("express").Router();
const controller = require("../Controller/usersController");
const upload = require("../Middleware/multer");

// GET USERS
Router.get("/users", controller.getUsers);
Router.get("/users/:id", controller.getUserById);

// EDIT USERS
Router.patch("/user/edit/:id", controller.editUser);
Router.patch("/user/editimage/:id", upload, controller.editUserProfile);

// DELETE USERS ROUTES
Router.delete("/users/delete", controller.deleteUser);

module.exports = Router;