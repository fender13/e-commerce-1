const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

// const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const dbconnect = process.env.DB_URL
mongoose.connect(`${dbconnect}`, { useNewUrlParser: true })

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const ProductSchema = new schema({
  productName: {
    type: String,
    required: true
  },
  productPicture: {
    type: String,
    required: true
  },
  shortDescriptions: {
    type: String
  },
  brand: {
    type: schema.Types.ObjectId,
    ref: 'Brands'
  },
  tags: [{
    type: String,
    ref: 'Tags'
  }],
  productDescriptions: {
    type: String,
    required: true
  },
  normalPrice: {
    type: Number, 
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
})

var Products = mongoose.model('Products', ProductSchema)

module.exports = Products