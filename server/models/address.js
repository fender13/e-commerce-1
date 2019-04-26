const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

// const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const schema = mongoose.Schema

const AddressSchema = new schema({
  addressName: {
    type: String,
    required: true
  },
  penerima: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  alamat: {
    type: String,
    required: true
  },
  cityId: {
    type: Number,
    required:true
  },
  cityName: {
    type: String,
    required: true
  },
  provinceId: {
    type: Number,
    required: true
  },
  provinceName: {
    type: String,
    required: true
  },
  postalCode: {
    type: Number,
    required: true
  },
  UserId: {
    type: schema.Types.ObjectId,
    ref: 'Users'
  }
})

var Address = mongoose.model('Address', AddressSchema)

module.exports = Address