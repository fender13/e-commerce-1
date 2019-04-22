const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
  static addNewItems(req, res) {
    const searchUserCart = { UserId: req.userData.id }
    const { productId } = req.body

    Cart
      .findOne(searchUserCart)
      .then((data) => {
        const getId = { _id: data._id }

        return Cart
          .findByIdAndUpdate(getId, 
            { "$push": { "ProductId": productId } },
            { "new": true, "upsert": true }
          )
          
      })
      .then((data) => {
        return Product
          .findById({
            _id: productId
          })
      })
      .then((dataProduct) => {
        res.status(200).json(dataProduct)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getCartProduct(req, res) {
    const searchUserCart = { UserId: req.userData.id }

    Cart
      .findOne(searchUserCart)
      .populate('ProductId')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static cekStokBarang(req, res) {
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

        for (let i = 0; i < results.length; i++) {
          if (results[i] == false) {
            throw results
          }
        }

        res.status(200).json(results)
      })
      .catch((err) => {
        res.status(400).json({
          message:err
        })
      })
  }
}

module.exports = CartController