const multer = require('multer')
const path = require('path')

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image') {
    // if uploading resume
    const filetypes = /jpeg|jpg|png|jfif/

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      return ('Error: Images Only!')
    }
  } else {
    // else uploading image
    const filetypes = /mp4/

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      return ('Error: Video Only!')
    }
  }
}

const uploadFile = multer({
  storage: fileStorage,
  limits: {
    fileSize: 8000000
  },
  fileFilter
})

module.exports = uploadFile
