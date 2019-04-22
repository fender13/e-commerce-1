const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

// const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const dbconnect = process.env.DB_URL
mongoose.connect(`${dbconnect}`, { useNewUrlParser: true })

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const TransactionSchema = new schema({
  UserId: {
    type: schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  ProductId: [{
    type: schema.Types.ObjectId,
    ref: "Products",
    required: true
  }],
  totalBelanja: {
    type: Number,
    required: true
  },
  alamatPengiriman: {
    type: schema.Types.ObjectId,
    ref: "Address",
  }, 
  ongkir: {
    type: Number,
    required: true
  },
  totalPembayaran: {
    type: Number,
    required: true
  },
  statusPengiriman: {
    type: Boolean,
    required: true
  },
  statusPenerimaan: {
    type: Boolean,
    required: true
  },
  metodePembayaran: {
    type: String,
    required: true
  },
  metodePengiriman: {
    type: String,
    required: true
  },
  servicePengiriman: {
    type: String,
    required: true
  },
  statusPembayaran: {
    type: Boolean,
    required: true
  },
  resiKirim: {
    type: String
  },
  linkPembayaran: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

var Transactions = mongoose.model('Transactions', TransactionSchema)

module.exports = Transactions