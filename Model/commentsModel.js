const db = require("../db"); // DATABASE

// GET COMMENTS
const getComments = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comments ", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getCommentById = (recipe_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM comments WHERE recipe_id=$1",
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

// GET REVIEWS
const reviews = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT *FROM recipes JOIN comments ON comments.recipe=recipes.name ORDER BY recipes.id ASC;",
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

// POST COMMENTS
const addComments = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO comments ( comment,user_id, recipe_id) VALUES ($1, $2, $3) RETURNING *",
      [props.comment, props.user_id, props.recipe_id],
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

module.exports = {
  getComments,
  reviews,
  addComments,
  getCommentById,
};
