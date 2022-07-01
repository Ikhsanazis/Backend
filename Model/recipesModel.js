const db = require('../db') // DATABASE

// GET RECIPES
const getRecipes = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes ', (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

// FIND RECIPES
const findRecipes = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM recipes WHERE name = $1',
      [name],
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

// FIND NEW RECIPES
const newRecipes = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM recipes ORDER BY id  DESC LIMIT 5 ',
      [id],
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

// PAGINATION
const pagination = (pagenumber, row) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *  FROM recipes ORDER BY id ASC OFFSET  ${row} LIMIT ${pagenumber} `,
      // [props.row, props.page],
      (error, result) => {
        if (pagenumber <= 0 || row <= 0) {
          reject(error)
        } else {
          resolve(result)
          console.log(result)
        }
      }
    )
  })
}

// POST RECIPES
const addRecipes = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO recipes (id, name, ingredients, image, video) VALUES ($1, $2, $3, $4, $5)',
      [props.id, props.name, props.ingredients, props.image, props.video],
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

// PATCH RECIPES
const editRecipes = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE recipes SET name= $1,ingredients = $2 WHERE id = $3',
      [props.name, props.ingredients, props.id],
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

// DELETE RECIPES
const getRecipesById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes WHERE id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const deleteRecipes = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM recipes WHERE id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getRecipes,
  findRecipes,
  newRecipes,
  addRecipes,
  editRecipes,
  getRecipesById,
  deleteRecipes,
  pagination
}
