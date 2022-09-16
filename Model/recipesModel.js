const db = require("../config/db"); // DATABASE

// GET RECIPES
const getRecipes = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM recipes ", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getSave = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT recipes.image, recipes.recipe_id, recipes.category, recipes.liked FROM saves INNER JOIN recipes ON saves.recipe_id = recipes.recipe_id WHERE saves.user_id=$1 ",
      [user_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getLike = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT recipes.image, recipes.recipe_id, recipes.category, recipes.liked FROM likes INNER JOIN recipes ON likes.recipe_id = recipes.recipe_id WHERE likes.user_id=$1 ",
      [user_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getPopular = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM recipes ORDER BY liked DESC", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getRecipesByCategory = (category) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM recipes WHERE category = $1",
      [category],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// FIND RECIPES
const findRecipes = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM recipes WHERE name = $1",
      [name],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// FIND NEW RECIPES
const newRecipes = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM recipes ORDER BY recipe_id  DESC LIMIT 5",
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// PAGINATION
const pagination = (pagenumber, row) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *  FROM recipes ORDER BY id ASC OFFSET  ${row} LIMIT ${pagenumber} `,
      // [props.row, props.page],
      (error, result) => {
        if (pagenumber <= 0 || row <= 0) {
          reject(error);
        } else {
          resolve(result);
          console.log(result);
        }
      }
    );
  });
};

const addLike = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO likes ( user_id, recipe_id) VALUES ($1, $2) RETURNING *",
      [props.user_id, props.recipe_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const addSave = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO saves ( user_id, recipe_id) VALUES ($1, $2) RETURNING *",
      [props.user_id, props.recipe_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
// POST RECIPES
const addRecipes = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO recipes ( name, ingredients, category,image,video,liked,user_id) VALUES ($1, $2, $3, $4, $5,$6,$7 )",
      [
        props.name,
        props.ingredients,
        props.category,
        props.image,
        props.video,
        props.liked,
        props.user_id,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const editRecipes = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE recipes SET name = $1, ingredients = $2, category = $3, user_id=$4 WHERE recipe_id = $5",
      [
        props.name,
        props.ingredients,
        props.category,
        props.user_id,
        props.recipe_id,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const editRecipesImage = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE recipes SET  image = $1, video=$2, user_id=$3 WHERE recipe_id = $4",
      [
        props.image,
        props.video,
        props.user_id,
        props.recipe_id,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// DELETE RECIPES
const getRecipesById = (recipe_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT *FROM recipes WHERE recipe_id = $1",
      [recipe_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getRecipesByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM recipes WHERE user_id = $1",
      [user_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getRecipeToEdit = (user_id, recipe_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM recipes WHERE user_id = $1 AND recipe_id = $2",
      [user_id, recipe_id],
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteRecipes = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM recipes WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getRecipes,
  findRecipes,
  newRecipes,
  addRecipes,
  editRecipes,
  getRecipesById,
  deleteRecipes,
  pagination,
  getRecipesByUser,
  getRecipeToEdit,
  getPopular,
  editRecipesImage,
  getSave,
  addLike,
  addSave,
  getLike,
  getRecipesByCategory
};
