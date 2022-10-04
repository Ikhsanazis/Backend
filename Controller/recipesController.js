const model = require("../Model/recipesModel");
// const cloudinary = require("../Middleware/cloudinary");

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

const newRecipes = async (req, res) => {
  try {
    const getData = await model.newRecipes();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("There's an Error!");
  }
};

const latestRecipes = async (req, res) => {
  try {
    const getData = await model.latestRecipes();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
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
    console.log(recipe_id);
    const getData = await model.getDetailRecipes(recipe_id);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const getUsersRecipes = async (req, res) => {
  try {
    const user_id = parseInt(req?.params?.user_id);
    const getData = await model.getRecipesByUser(user_id);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const getRecipesByCategory = async (req, res) => {
  try {
    const category = req?.params.category;
    const getData = await model.getRecipesByCategory(category);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("There's an Error!");
  }
};

const getLike = async (req, res) => {
  const user_id = req?.params?.user_id;

  try {
    const getData = await model.getLike(user_id);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const getSave = async (req, res) => {
  const user_id = req?.params?.user_id;

  try {
    const getData = await model.getSave(user_id);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const findRecipes = async (req, res) => {
  try {
    const keyword = req.query.keyword.toLowerCase();
    const filter = req.query.filter;

    console.log(keyword, filter);
    const getData = await model.findRecipes(keyword, filter);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

const searchRecipes = async (req, res) => {
  const { keyword, filter } = req.body;
  console.log(keyword, filter);
  try {
    const getData = await model.findRecipes(keyword, filter);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
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
    const liked = 0;
    console.log(liked);
    const user_id = req?.params.id;
    console.log(req.params, user_id);

    // const image = req.files.image[0].path;
    // console.log("----------------------------");
    // console.log(image);
    // console.log(req.files.image[0]);

    // console.log("----------------------------");

    // const video = req.files.video.map((e) => {
    //   return e.path;
    // });
    // console.log(video);
    // console.log("----------------------------");

    // const uploadPhoto = await cloudinary.uploader.upload(image, {
    // });

    // const imageUrl = uploadPhoto.url;
    // console.log("ini image", imageUrl);

    // const videoUrl = [];
    // console.log(video[0]);
    // video.map((e) => console.log("ini e", e));
    // console.log(video.length);

    // for (let i = 0; i < video?.length; i++) {
    //   const videos = await cloudinary.uploader.upload(video[i], {
    //     // upload_preset: `secretingredients`,
    //     resource_type: `video`,
    //   });
    //   console.log("loop", video[i]);
    //   console.log("loop videos", videos.url);
    //   videoUrl.push(videos.url);
    // }
    // console.log(videoUrl);

    const addRecipes = await model.addRecipes({
      name,
      ingredients,
      // image: imageUrl,
      // video: videoUrl,
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
    const { name, ingredients, category, liked } = req.body;
    const { recipe_id } = req.params;
    console.log(recipe_id);

    const getData = await model.getRecipesById(recipe_id);
    console.log(name, ingredients, category);

    console.log("----------------------------");

    if (getData.rowCount > 0) {
      const newName = name || getData.rows[0].name;
      const newIngredients = ingredients || getData.rows[0].ingredients;
      const newCategory = category || getData.rows[0].category;
      const newRecipe_id = getData.rows[0].recipe_id;
      const newUser_id = getData.rows[0].user_id;
      const newliked = liked || getData.rows[0].liked;

      let message = "Recipe";
      const editData = await model.editRecipes({
        name: newName,
        ingredients: newIngredients,
        category: newCategory,
        user_id: newUser_id,
        liked: newliked,
        recipe_id: newRecipe_id,
      });

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

const editRecipesImage = async (req, res) => {
  try {
    const { name, ingredients, category } = req.body;
    const { recipe_id } = req.params;
    console.log(recipe_id);

    const getData = await model.getRecipesById(recipe_id);
    console.log(getData, "TEST");
    console.log(name, ingredients, category);

    const isimage = req.files.image;
    !isimage ? null : isimage[0];
    const image = isimage[0].filename;
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

    if (getData.rowCount > 0) {
      // const newName = name || getData.rows[0].recipe_id;
      // const newIngredients = ingredients || getData.rows[0].recipe_id;
      // const newCategory = category || getData.rows[0].category;
      const newRecipe_id = getData.rows[0].recipe_id;
      const newUser_id = getData.rows[0].user_id;
      // console.log(image)

      let message = "Recipe";
      // console.log(newIngredients)
      // if (newName) message += "Name,";
      // if (newIngredients) message += "Ingredients,";
      const editData = await model.editRecipesImage({
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

// LIKE RECIPE
const addLike = async (req, res) => {
  try {
    const { user_id, recipe_id } = req.params;
    const addComments = await model.addLike({ user_id, recipe_id });

    if (addComments) {
      res.send("Liked");
    } else {
      res.status(400).send("Failed to add");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

//SAVE RECIPE
const addSave = async (req, res) => {
  try {
    const { user_id, recipe_id } = req.params;
    const addComments = await model.addSave({ user_id, recipe_id });

    if (addComments) {
      res.send("Saved this recipe");
    } else {
      res.status(400).send("Failed to add");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("There's an Error!");
  }
};

module.exports = {
  getRecipes,
  getLike,
  getSave,
  findRecipes,
  searchRecipes,
  newRecipes,
  addRecipes,
  editRecipes,
  editRecipesImage,
  deleteRecipes,
  pagination,
  getUsersRecipes,
  getDetailRecipes,
  getPopular,
  addLike,
  addSave,
  getRecipesByCategory,
  latestRecipes,
};
