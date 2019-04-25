const Cart = require('../models/cart')

module.exports = (req, res, next)  => {
  Cart
    .findOne({
      UserId: req.userData.id
    })
    .then((data) => {
      if (!data) {
        res.status(400).json({
          error: 'Dilarang update CART orang lain'
        })
      } else {
        if (data.UserId == req.userData.id) {
          next()
        } else {
          res.status(400).json({
            error: 'Dilarang update CART orang lain 2'
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err.message
      })
    })
}