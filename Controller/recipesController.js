const model = require('../model/recipesModel')

// GET RECIPES
const getRecipes = async (req, res) => {
  try {
    const getData = await model.getRecipes()

    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    console.log(error)
    res.status(400).send("There's an Error!")
  }
}

// FIND RECIPES
const findRecipes = async (req, res) => {
  try {
    const { name } = req.body

    const getData = await model.findRecipes(name)

    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    res.status(400).send("There's an Error!")
  }
}

// FIND NEW RECIPES
const newRecipes = async (req, res) => {
  try {
    const { id } = req.body

    const getData = await model.newRecipes(id)

    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    res.status(400).send("There's an Error!")
  }
}

// PAGINATION
const pagination = async (req, res) => {
  try {
    const { row, page } = req.body
    const pagenumber = page - 1
    const getData = await model.pagination(row, pagenumber)

    if (getData.rowCount > 0) {
      res.send({ data: getData.rows, jumlahData: getData.rowCount })
    } else {
      res.status(400).send('Page not found')
    }
  } catch (error) {
    res.status(400).send('must greater than 0')
  }
}

// POST RECIPES

const addRecipes = async (req, res) => {
  try {
    const { id, name, ingredients } = req.body
    // const image = req?.file?.path;
    // const video = req?.file?.path;
    const image = req.files.image[0].filename
    console.log('----------------------------')
    console.log(image)
    const video = req.files.video.map(e => { return e.filename })
    console.log('----------------------------')
    console.log(video)
    console.log('----------------------------')

    const addRecipes = await model.addRecipes({
      id,
      name,
      ingredients,
      image,
      video
    })

    if (addRecipes) {
      res.send('Successfully added')
    } else {
      res.status(400).send('failed to add')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("There's an Error!")
  }
}

// PATCH RECIPES
const editRecipes = async (req, res) => {
  try {
    const { id, name, ingredients } = req.body

    const getData = await model.getUserById(id)

    if (getData.rowCount > 0) {
      const newName = name || res?.rows[0]?.name
      const newIngredients = ingredients || res?.rows[0]?.ingredients

      let message = ''
      if (newName) message += 'Name,'
      if (newIngredients) message += 'Ingredients,'

      const editData = await model.editRecipes({
        name: newName,
        ingredients: newIngredients,
        id
      })

      if (editData) {
        res.send(`${message} success to change`)
      } else {
        res.status(400).send('failed to change')
      }
    } else {
      res.status(400).send('data not found')
    }
  } catch (error) {
    res.status(400).send("There's an Error!")
  }
}

// DELETE RECIPES
const deleteRecipes = async (req, res) => {
  try {
    const { id } = req.body

    const getData = await model.getRecipesById(id)

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteRecipes(id)

      if (deleteUser) {
        res.send(`data ${id} deleted`)
      } else {
        res.status(400).send('failed to delete')
      }
    } else {
      res.status(400).send('data not found')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("There's an Error!")
  }
}

module.exports = {
  getRecipes,
  findRecipes,
  newRecipes,
  addRecipes,
  editRecipes,
  deleteRecipes,
  pagination
}
