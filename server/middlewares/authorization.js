const User = require('../models/user')

module.exports = (req, res, next) => {
  const getId = { _id: req.userData.id }

  User
    .findById(getId)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: 'USER TIDAK VALID'
        })
      } else {
        if (data.role == 'admin' && data.username == req.userData.username) {
          next()
        } else {
          res.status(400).json({
            message: 'DILARANG UPDATE JIKA BUKAN ADMIN'
          })
        }
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: 'DILARANG UPDATE JIKA BUKAN ADMIN'
      })
    })
}