const db = require('../db') // DATABASE

// GET ALL USERS
const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users ', (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

// GET USERS BY EMAIL
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
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

// GET USERS BY ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

// POST USERS
const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [props.inputId, props.inputUsername, props.inputEmail, props.inputPassword],
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

// PATCH USERS
const editUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4',
      [props.username, props.email, props.password, props.id],
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

// DELETE USERS
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  addUser,
  editUser,
  deleteUser
}
