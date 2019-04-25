const Product = require('../models/product')
const Brand = require('../models/brand')

const addProductTags = require('../helpers/addProductTags')

class ProductController {
  static createNewProduct(req, res) {
    const { productName, shortDescription, tags, brand, productDescription, normalPrice, price, quantity, weight } = req.body
    const tagsSplit = tags.split(',')
    let dataBrand
    let dataProduct

    let url = ''
    if (req.file && req.file.gcsUrl) {
      url = req.file.gcsUrl
    } else {
      throw new Error('Unable to upload');
    }

    Brand
      .findOne({
        brandName: brand
      })
      .then((data) => {
        dataBrand = data
        const brandId = data._id

        return Product
          .create({
            productName: productName,
            productPicture: url,
            shortDescriptions: shortDescription,
            brand: brandId,
            tags: tagsSplit,
            productDescriptions: productDescription,
            normalPrice: normalPrice,
            price: price,
            quantity: quantity,
            weight: weight
          })
      })
      .then((data) => {
        dataProduct = data
        const getId = { _id: dataBrand._id }

        let count = 0

        for (let j = 0; j < dataBrand.ProductId.length; j++) {
          if (dataBrand.ProductId[j] == dataProduct._id) {
            count++
          }
        }

        if (count > 0) {
          throw 'Product Sudah TERDAFTAR'
        } else {
          return Brand
            .findOneAndUpdate(getId, 
              { "$push": { "ProductId": data._id } },
              { "new": true, "upsert": true }  
            )
        }
      })
      .then((newData) => {
        for (let i = 0; i < dataProduct.tags.length; i++) {
          addProductTags(dataProduct.tags[i], dataProduct._id)
        }

        res.status(201).json(dataProduct)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  static getAllProduct(req, res) {
    Product
      .find()
      .populate('brand')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getSingleProduct(req, res) {
    Product
      .findOne({
        _id: req.params.id
      })
      .populate('brand')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = ProductController