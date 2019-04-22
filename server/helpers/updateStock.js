const Product = require('../models/product')

module.exports = (productId, quantity) => {
  const id = { _id: productId }

  Product
    .findById(id)
    .then((data) => {
      let updateStock = data.quantity - quantity

      return Product
        .findByIdAndUpdate(id, {
          quantity: updateStock
        })
    })
    .then((data) => {
      console.log('Quantity Updated')
    })
    .catch((err) => {
      console.log(err)
    })
}