const multer1 = require('../fileUpload')
const multer = require('multer')

// UPLOAD IMAGES WITH MULTER
const uploadFile = (req, res, next) => {
  const upload = multer1.fields([
    { name: 'image' },
    { name: 'video', maxCount: 4 }
  ])

  upload(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        res.status(400).send(err?.message ?? 'Something went wrong!')
        return
      } else if (err) {
        res.status(400).send(err ?? 'Something went wrong!')
        return
      }
      next()
    } catch (error) {
      res.status(500).send(error?.message ?? 'Failed to upload')
    }
  })
}

module.exports = uploadFile
