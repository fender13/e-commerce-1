const router = require('express').Router()
const controller = require('../controllers/courierController')
const authentication = require('../middlewares/authentication')
const cekAddressExist = require('../middlewares/cekIfAddressExist')

// get indonesia area
router.get('/', authentication, controller.indonesiaArea)

// create address
router.post('/', authentication, cekAddressExist, controller.addNewAddress)

// get address
router.get('/address', authentication, controller.getAllAddress)

// get cost
router.post('/cost', authentication, controller.getOngkir)

module.exports = router