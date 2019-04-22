const Cart = require('../models/cart')

module.exports = (req, res, next) => {
  const searchUserCart = { UserId: req.userData.id }

  Cart
    .findOne(searchUserCart)
    .then((data) => {
      if (data) {
        next()
      } else {
        Cart
          .create({
            UserId: req.userData.id
          })
          .then((data) => {
            next()
          })
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err
      })
    })
}