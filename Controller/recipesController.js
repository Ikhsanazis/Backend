const model = require("../Model/recipesModel");

// GET RECIPES
const getRecipes = async (req, res) => {
  try {
    const getData = await model.getRecipes();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const getPopular = async (req, res) => {
  try {
    const getData = await model.getPopular();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const getDetailRecipes = async (req, res) => {
  try {
    const recipe_id = parseInt(req?.params?.recipe_id);
    // console.log(req.params)
    const getData = await model.getRecipesById(recipe_id);

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const getUsersRecipes = async (req, res) => {
  try {
    const user_id = parseInt(req?.params?.user_id);
    // console.log(req.params)
    const getData = await model.getRecipesByUser(user_id);

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

// FIND RECIPES
const findRecipes = async (req, res) => {
  try {
    const { name } = req.body;

    const getData = await model.findRecipes(name);

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("There's an Error!");
  }
};

// FIND NEW RECIPES
const newRecipes = async (req, res) => {
  try {
    const getData = await model.newRecipes();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("There's an Error!");
  }
};

// PAGINATION
const pagination = async (req, res) => {
  try {
    const { row, page } = req.body;
    const pagenumber = page - 1;
    const getData = await model.pagination(row, pagenumber);

    if (getData.rowCount > 0) {
      res.send({ data: getData.rows, jumlahData: getData.rowCount });
    } else {
      res.status(400).send("Page not found");
    }
  } catch (error) {
    res.status(400).send("must greater than 0");
  }
};

// POST RECIPES

const addRecipes = async (req, res) => {
  try {
    const { name, ingredients, category } = req.body;
    console.log(req.body.name);
    const user_id = req?.params.id;
    console.log(req.params, user_id);
    const liked = 10;

    const image = req.files.image[0].filename;
    // image? req.files.image[0].filename:[]
    console.log("----------------------------");
    console.log(image);

    console.log("----------------------------");
    // {video?video:[]}
    // req.files.video ? req.files.video : [];
    const video = req.files.video.map((e) => {
      return e.filename;
    });
    console.log(video);
    console.log("----------------------------");

    const addRecipes = await model.addRecipes({
      name,
      ingredients,
      image,
      video,
      category,
      liked,
      user_id,
    });

    if (addRecipes) {
      res.send("Successfully added");
    } else {
      res.status(400).send("failed to add");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

// PATCH RECIPES
const editRecipes = async (req, res) => {
  try {
    const { name, ingredients, category } = req.body;
    const { recipe_id } = req.params;
    console.log(recipe_id);

    const getData = await model.getRecipesById(recipe_id);
    console.log(getData, "TEST");

    const isimage = req.files.image;
    !isimage ? null : isimage[0];
    const image = isimage[0].filename;
    // image? req.files.image[0].filename:[]
    console.log("----------------------------");
    console.log(image);

    console.log("----------------------------");
    // {video?video:[]}
    req.files.video ? req.files.video : [];
    const video = req.files.video.map((e) => {
      return e.filename;
    });
    console.log(video);
    console.log("----------------------------");

    if (getData.rowCount > 0) {
      const newName = name || getData.rows[0].recipe_id;
      const newIngredients = ingredients || getData.rows[0].recipe_id;
      const newCategory = category || getData.rows[0].category;
      const newRecipe_id = getData.rows[0].recipe_id;
      const newUser_id = getData.rows[0].user_id;
      // console.log(image)

      let message = "Recipe";
      // console.log(newIngredients)
      // if (newName) message += "Name,";
      // if (newIngredients) message += "Ingredients,";
      const editData = await model.editRecipes({
        name: newName,
        ingredients: newIngredients,
        category: newCategory,
        image,
        video,
        user_id: newUser_id,
        recipe_id: newRecipe_id,
      });

      // const editData = await model.editRecipes({
      //   username: newUserName,
      //   email: newEmail,
      //   password: newPassword,
      //   image,
      //   id,
      // });

      console.log("test");

      if (editData) {
        res.send(`${message} updated`);
      } else {
        res.status(400).send("failed to change");
      }
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
};

// DELETE RECIPES
const deleteRecipes = async (req, res) => {
  try {
    const { id } = req.body;

    const getData = await model.getRecipesById(id);

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteRecipes(id);

      if (deleteUser) {
        res.send(`data ${id} deleted`);
      } else {
        res.status(400).send("failed to delete");
      }
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

module.exports = {
  getRecipes,
  findRecipes,
  newRecipes,
  addRecipes,
  editRecipes,
  deleteRecipes,
  pagination,
  getUsersRecipes,
  getDetailRecipes,
  getPopular,
};
