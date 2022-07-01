const model = require('../model/commentsModel')

// GET COMMENTS
const getComments = async (req, res) => {
  try {
    const getData = await model.getComments()

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
    const { recipe, comment } = req.body
    const addComments = await model.addComments({ recipe, comment })

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
  addComments
}
