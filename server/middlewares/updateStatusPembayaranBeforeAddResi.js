const Transaction = require('../models/transaction')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Transaction
    .findById(getId)
    .then((data) => {
      if (data.statusPembayaran == 'pending' || data.statusPembayaran == 'false') {
        Transaction
          .findByIdAndUpdate(getId, {
            statusPembayaran: 'true'
          })
          .then((data) => {
            next()
          })
      } else {
        next()
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      })
    })
}