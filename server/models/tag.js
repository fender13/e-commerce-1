const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

// const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const schema = mongoose.Schema

const TagSchema = new schema({
  tagName: {
    type: String,
  },
  ProductId: [{
    type: schema.Types.ObjectId,
    ref: 'Products'
  }]
})

var Tags = mongoose.model('Tags', TagSchema)

module.exports = Tags