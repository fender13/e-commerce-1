const Product = require('../models/product')

module.exports = (req, res, next) => {
  const { productId } = req.body

  Product
    .findById({
      _id: productId
    })
    .then((dataProduct) => {
      if (dataProduct.quantity > 0) {
        next()
      } else {
        res.status(400).json({
          message: 'Stok produk sedang kosong'
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err
      })
    })
}