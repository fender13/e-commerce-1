const Transaction = require('../models/transaction')
const Product = require('../models/transaction')
const Cart = require('../models/cart')
const updateStock = require('../helpers/updateStock')

class TransactionController {
  static addNewTransaction(req, res) {
    const { allitems, items, quantity, totalBelanja, totalCost, serviceCost, fixedCourier, fixedService, pembayaran, pengiriman } = req.body

    const userId = { UserId: req.userData.id }

    let dataTransaction

    let arr = []
    for (let i = 0; i < allitems.length; i++) {
      arr.push(allitems[i]._id)
    }

    Transaction
      .create({
        UserId: req.userData.id,
        ProductId: arr,
        totalBelanja: totalBelanja,
        alamatPengiriman: pengiriman._id,
        ongkir: serviceCost,
        totalPembayaran: totalCost,
        statusPengiriman: 'false',
        statusPenerimaan: 'false',
        metodePembayaran: pembayaran,
        metodePengiriman: fixedCourier,
        servicePengiriman: fixedService,
        statusPembayaran: 'false',
        resiKirim: 'null',
        linkPembayaran: 'null',
        createdAt: new Date()
      })
      .then((data) => {
        dataTransaction = data
        return Cart
          .findOneAndUpdate(userId, {
            ProductId: []
          })
      })
      .then((data) => {
        for (let i = 0; i < items.length; i++) {
          updateStock(items[i]._id, quantity[i])
        }

        res.status(201).json(dataTransaction)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getAllTransaction(req, res) {
    Transaction
      .find({
        UserId: req.userData.id
      })
      .populate('ProductId')
      .populate('alamatPengiriman')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getAllSuccessTransaction(req, res) {
    Transaction
      .find()
      .populate('UserId')
      .populate('alamatPengiriman')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  static updateBuktiBayar(req, res) {
    const getId = { _id: req.params.id }

    let url = ''
    if (req.file && req.file.gcsUrl) {
      url = req.file.gcsUrl
    } else {
      throw new Error('Unable to upload');
    }

    Transaction
      .findByIdAndUpdate(getId, {
        linkPembayaran: url,
        statusPembayaran: 'pending'
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static updateResi(req, res) {
    const { resiKirim } = req.body
    const getId = { _id: req.params.id }

    Transaction
      .findByIdAndUpdate(getId, {
        resiKirim: resiKirim,
        statusPengiriman: 'true'
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static updateStatusPemesanan(req, res) {
    const getId = { _id: req.params.id }

    Transaction
      .findByIdAndUpdate(getId, {
        statusPenerimaan: 'true'
      })
      .then((data) => {
        return Transaction
          .findById(getId)
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = TransactionController