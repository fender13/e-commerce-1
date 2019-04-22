const Address = require('../models/address')
const axios = require('axios')
var instance = axios.create({
  baseURL: 'https://api.rajaongkir.com/starter',
  headers: {'key': process.env.RajaOngkir}
})

class CourierController {
  static indonesiaArea(req, res) {
    instance
      .get(`/city`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  static addNewAddress(req, res) {
    const UserId = { UserId: req.userData.id }
    const { addressName, penerima, contact, alamat, cityId, cityName, provinceId, provinceName, postalCode } = req.body

    Address
      .create({
        addressName: addressName,
        penerima: penerima, 
        contact: contact, 
        alamat: alamat, 
        cityId: cityId, 
        cityName: cityName, 
        provinceId: provinceId, 
        provinceName: provinceName, 
        postalCode: postalCode,
        UserId: req.userData.id
      })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getAllAddress(req, res) {
    const UserId = { UserId: req.userData.id }

    Address
      .find(UserId)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static getOngkir(req, res) {
    instance
      .post(`/cost`, req.body)
      .then(({ data }) => {
        res.status(200).json(data.rajaongkir.results[0].costs)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }
}

module.exports = CourierController