const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

// const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const schema = mongoose.Schema

const BrandSchema = new schema({
  brandName: {
    type: String,
    required: true
  },
  brandPicture: {
    type: String,
    required: true
  },
  ProductId: [{
    type: schema.Types.ObjectId,
    ref: "Products"
  }]
})

var Brands = mongoose.model('Brands', BrandSchema)

module.exports = Brands