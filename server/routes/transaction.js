const router = require('express').Router()
const controller = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')
const stockCheck = require('../middlewares/cekIfStockReady')

// post transaction
router.post('/', authentication, stockCheck, controller.addNewTransaction)

// get all transaction
router.get('/', authentication, controller.getAllTransaction)

module.exports = router