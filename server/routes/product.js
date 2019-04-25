const router = require('express').Router()
const controller = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const gcsMiddlewares = require('../middlewares/google-cloud-storage')
const Multer = require('multer')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  }
})

// create new product
router.post('/upload', authentication, authorization, multer.single('image'), gcsMiddlewares.sendUploadToGCS, controller.createNewProduct)

// get all product
router.get('/', controller.getAllProduct)

// get single product
router.get('/:id', controller.getSingleProduct)

module.exports = router