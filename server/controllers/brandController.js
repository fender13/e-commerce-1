const Brand = require('../models/brand')

class BrandController {
  static addNewBrand(req, res) {
    const { brandName } = req.body

    let url = ''
    if (req.file && req.file.gcsUrl) {
      url = req.file.gcsUrl
    } else {
      throw new Error('Unable to upload');
    }

    Brand
      .create({
        brandName: brandName,
        brandPicture: url
      })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  }

  static getAllBrands(req, res) {
    Brand
      .find()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}

module.exports = BrandController