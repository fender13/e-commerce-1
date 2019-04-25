const Transaction = require('../models/transaction')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Transaction
    .findById(getId)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: 'Transaction Not Found'
        })
      } else {
        if (data.UserId == req.userData.id) {
          next()
        } else {
          res.status(400).json({
            message: 'DILARANG UPDATE JIKA BUKAN OWNER'
          })
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      })
    })
}