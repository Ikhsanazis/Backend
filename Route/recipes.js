const Router = require("express").Router();
const controller = require("../Controller/recipesController");
const upload = require("../Middleware/multer");

// GET RECIPES ROUTES
Router.get("/recipes", controller.getRecipes);
Router.get("/popular", controller.getPopular);
Router.get("/newrecipe", controller.newRecipes);
Router.get("/latestrecipe", controller.latestRecipes);
Router.get("/recipes/:category", controller.getRecipesByCategory);
Router.get("/:recipe_id", controller.getDetailRecipes);
Router.get("/user/recipes/:user_id", controller.getUsersRecipes);

// FIND RECIPES
Router.get("/recipe/search", controller.findRecipes);
Router.get("/recipe/find", controller.findRecipes);

// pagination
Router.get("/recipes/pagination", controller.pagination);

// POST RECIPES
Router.post("/recipes/add/:id", upload, controller.addRecipes);

// EDIT RECIPES
Router.patch("/edit/:recipe_id", controller.editRecipes);
Router.patch("/editimage/:recipe_id", upload, controller.editRecipesImage);

// DELETE RECIPES ROUTES
Router.delete("/recipes/delete", controller.deleteRecipes);

// LIKE
Router.post("/like/:user_id/:recipe_id", controller.addLike);
Router.get("/likedrecipes/:user_id", controller.getLike);

// SAVE
Router.post("/save/:user_id/:recipe_id", controller.addSave);
Router.get("/savedrecipes/:user_id", controller.getSave);

module.exports = Router;
