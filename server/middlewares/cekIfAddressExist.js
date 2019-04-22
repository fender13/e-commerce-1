const Address = require('../models/address')

module.exports = (req, res, next) => {
  const { addressName } = req.body

  Address
    .findOne({
      addressName: addressName
    })
    .then((data) => {
      if (!data) {
        next()
      } else {
        res.status(400).json({
          message: 'Alamat sudah ada di database'
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err
      })
    })
}