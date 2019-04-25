const router = require('express').Router()
const controller = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')
const authorizationTransaction = require('../middlewares/authorizationTransaction')
const updateStatusPembayaranBeforeAddResi = require('../middlewares/updateStatusPembayaranBeforeAddResi')
const stockCheck = require('../middlewares/cekIfStockReady')

const gcsMiddlewares = require('../middlewares/google-cloud-storage')
const Multer = require('multer')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  }
})

// post transaction
router.post('/', authentication, stockCheck, controller.addNewTransaction)

// get all users transaction
router.get('/', authentication, controller.getAllTransaction)

// get all admin orders
router.get('/all', controller.getAllSuccessTransaction)

// upload bukti bayar dan admin
router.put('/:id', authentication, authorizationTransaction, multer.single('image'), gcsMiddlewares.sendUploadToGCS, controller.updateBuktiBayar)

// update resi pengiriman
router.put('/resi-kirim/:id', authentication, updateStatusPembayaranBeforeAddResi, controller.updateResi)

// transaction DONE
router.put('/selesai/:id', authentication, authorizationTransaction, controller.updateStatusPemesanan)

module.exports = router