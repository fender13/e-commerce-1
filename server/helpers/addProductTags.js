const Tag = require('../models/tag')

module.exports = (tagName, productId) => {
  Tag
    .findOne({
      tagName: tagName
    })
    .then((data) => {
      if (!data) {
        return Tag
          .create({
            tagName: tagName,
            ProductId: [productId]
          })
      } else {
        const getId = { _id: data._id }
        let count = 0

        for (let i = 0; i < data.ProductId.length; i++) {
          if (data.ProductId[i] == productId) {
            count++
          }
        }

        if (count > 0) {
          throw 'Product Sudah TERDAFTAR'
        } else {
          return Tag
            .findOneAndUpdate(getId, 
              { "$push": { "ProductId": productId } },
              { "new": true, "upsert": true }
            )
        }
      }
    })
    .then((data) => {
      console.log('Tag Has BEEN UPDATED')
    })
    .catch((err) => {
      console.log(err)
    })
}