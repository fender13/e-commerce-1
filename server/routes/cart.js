const router = require('express').Router()
const controller = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const cartAuthorizationExistCheck = require('../middlewares/cartAuthorizationExistCheck')
const cekStock = require('../middlewares/cekStock')

// save product to cart
router.post('/', authentication, cartAuthorizationExistCheck, cekStock, controller.addNewItems)

// get saved cart
router.get('/', authentication, controller.getCartProduct)

// cek stok product
router.post('/verify-stock', authentication, controller.cekStokBarang)

module.exports = router