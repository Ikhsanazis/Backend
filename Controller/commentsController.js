const model = require('../Model/commentsModel')

// GET COMMENTS
const getComments = async (req, res) => {
  try {
    const getData = await model.getComments()
    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    res.status(400).send("There's an Error!")
  }
}

// GET COMMENTS
const getCommentById = async (req, res) => {
  try {
    const{recipe_id} = req.params
    console.log(recipe_id)
    const getData = await model.getCommentById(recipe_id)
    console.log(getData.rows)
    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    res.status(400).send("There's an Error!")
  }
}

// GET reviews
const reviews = async (req, res) => {
  try {
    const getData = await model.reviews()
    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    res.status(400).send('error', error)
  }
}

// POST COMMENTS
const addComments = async (req, res) => {
  try {
    const { user_id, recipe_id} = req.params
    console.log(user_id, recipe_id)
    const { comment } = req.body
    const addComments = await model.addComments({ user_id,recipe_id, comment })

    if (addComments) {
      res.send('Successfully added data')
    } else {
      res.status(400).send('Failed to add')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("There's an Error!")
  }
}

module.exports = {
  getComments,
  reviews,
  addComments,
  getCommentById
}
