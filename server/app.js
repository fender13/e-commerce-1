const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

const ENV = require('dotenv')
ENV.config()

const port = 3000

const dbconnect = process.env.DB_URL
mongoose.connect(`${dbconnect}`, { useNewUrlParser: true })

mongoose.set('useFindAndModify', false)

const indexRoutes = require('./routes/index')
const brandRoutes = require('./routes/brand')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const courierRoutes = require('./routes/rajaOngkir')
const transactionRoutes = require('./routes/transaction')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRoutes)
app.use('/brands', brandRoutes)
app.use('/products', productRoutes)
app.use('/carts', cartRoutes)
app.use('/couriers', courierRoutes)
app.use('/purchase', transactionRoutes)

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'ERROR 404 - PAGE NOT FOUND'
  })
})

app.listen(port, () => {
  console.log('SERVER IS ON AND LISTEN TO PORT', port)
})

module.exports = app

