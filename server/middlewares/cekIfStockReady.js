const Product = require('../models/product')

module.exports = (req, res, next) => {
  const { items, quantity } = req.body
    
    let arr = []

    for (let i = 0; i < items.length; i++) {
      arr.push(`${items[i]._id}`)
    }

    Product
      .find({
        '_id': { $in: arr }
      })
      .then((data) => {
        let results = []

        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (arr[i] == data[j]._id) {
              if (quantity[i] > data[j].quantity) {
                results.push(false)
              } else {
                results.push(true)
              }
            }
          }
        }

        let cek = true

        for (let i = 0; i < results.length; i++) {
          if (results[i] == false) {
            cek = false
          }
        }

        if (cek == false) {
          throw 'Product Tidak Tersedia'
        } else {
          next()
        }
      })
      .catch((err) => {
        res.status(400).json({
          message:err
        })
      })
  
}