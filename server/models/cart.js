const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

// const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const dbconnect = process.env.DB_URL
mongoose.connect(`${dbconnect}`, { useNewUrlParser: true })

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const CartSchema = new schema({
  UserId: {
    type: schema.Types.ObjectId,
    ref: 'Users'
  },
  ProductId: [{
    type: schema.Types.ObjectId,
    ref: "Products"
  }]
})

var Carts = mongoose.model('Carts', CartSchema)

module.exports = Carts