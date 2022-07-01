const db = require('../db') // DATABASE

// GET COMMENTS
const getComments = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM comments ', (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

// GET REVIEWS
const reviews = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT *FROM recipes JOIN comments ON comments.recipe=recipes.name ORDER BY recipes.id ASC;',
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

// POST COMMENTS
const addComments = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO comments ( recipe, comment) VALUES ($1, $2) RETURNING *',
      [props.recipe, props.comment],
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

module.exports = {
  getComments,
  reviews,
  addComments
}
