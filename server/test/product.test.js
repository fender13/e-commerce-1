const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')

const jwt = require('jsonwebtoken')

var productId = ''

chai.use(chaiHttp)

let admin = ''
let member = ''

let adminToken = ''
let memberToken = ''

describe('Product', function() {
  beforeEach(done => {
    let newUser = {
      firstName: 'Ernest',
      lastName: 'Johanes',
      username: 'fender13',
      email: 'ernest@mail.com',
      password: '12345',
      role: 'admin'
    }

    User.create(newUser)
      .then(user => {
        let signUser = {
          id: user._id,
          username: user.username,
          role: user.role
        };

        adminToken = jwt.sign(signUser, process.env.JWT_SECRET);

        done()
      })
      .catch(err => {
        throw err
      })
  })

  beforeEach(done => {
    let wika = {
      firstName: 'Lalu',
      lastName: 'Oldi',
      username: 'oldi13',
      email: 'oldit@mail.com',
      password: '12345',
      role: 'member'
    }

    User.create(wika)
      .then(user => {
        let signUser = {
          id: user._id,
          username: user.username,
          role: user.role
        };

        memberToken = jwt.sign(signUser, process.env.JWT_SECRET);

        done()
      })
      .catch(err => {
        throw err
      })
  })

  after(done => {
    Product
      .deleteMany({}, () => {
        done()
      })
  })

  after(done => {
    User
      .deleteMany({}, () => {
        done()
      })
  })

  describe('POST /products', function() {

    it('should return status code 201 and create products', function(done) {
      chai
        .request(app)
        .post('/products/upload')
        .set('token', adminToken)
        .send({
          productName: 'Abercrombie & Fitch First Instinct Blue for Men EDT 100ml',
          productPicture: 'https://multiparfum.com/wp-content/uploads/2018/12/Abercrombie-Fitch-First-Instinct-Blue-for-Men-EDT-100ml.jpg',
          shortDescriptions: 'First Instinct Blue from Abercrombie & Fitch is announced as unexpected, bold and truly masculine. It is Abercrombie’s fragrant interpretation of the moment of exhilaration when you feel the sky’s the limit. First Instinct Blue is a fresh, one-of-a-kind Fougere scent for the adventurous man who lives by his First Instinct.',
          brand: 'Abercrombie & Fitch',
          tags: 'parfum,murah',
          productDescriptions: 'Its aromatic-fougere composition opens up with the freshness of frozen apple, develops with crisp lavender, but then leaves a deeper trail of addictive amber. The creation is signed by Yves Cassar from IFF. He reportedly wanted to create a fragrance that would combine the core values of the brand with the blue color, resulting in a combination of exhilarating fresh notes enhanced with spicy notes, and balanced by the intense power of amber.',
          normalPrice: 625000,
          price: 575000,
          quantity: 10,
          weight: 1
      })
      .end(function(err, res) {
        productId = res.body._id
        expect(err).to.be.null;

        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('productName');
        expect(res.body).to.have.property('normalPrice');
        expect(res.body).to.have.property('price');

        expect(res.body.from).to.have.property('productName');
        expect(res.body.from).to.have.property('normalPrice');
        expect(res.body.from).to.have.property('price');

        done();
      })
    })


    it('should return status code 400 and error message DILARANG UPDATE JIKA BUKAN ADMIN', function(done) {

      chai
        .request(app)
        .post('/products/upload')
        .set('token', memberToken)
        .send({
          productName: 'Abercrombie & Fitch First Instinct Blue for Men EDT 100ml',
          productPicture: 'https://multiparfum.com/wp-content/uploads/2018/12/Abercrombie-Fitch-First-Instinct-Blue-for-Men-EDT-100ml.jpg',
          shortDescriptions: 'First Instinct Blue from Abercrombie & Fitch is announced as unexpected, bold and truly masculine. It is Abercrombie’s fragrant interpretation of the moment of exhilaration when you feel the sky’s the limit. First Instinct Blue is a fresh, one-of-a-kind Fougere scent for the adventurous man who lives by his First Instinct.',
          brand: 'Abercrombie & Fitch',
          tags: 'parfum,murah',
          productDescriptions: 'Its aromatic-fougere composition opens up with the freshness of frozen apple, develops with crisp lavender, but then leaves a deeper trail of addictive amber. The creation is signed by Yves Cassar from IFF. He reportedly wanted to create a fragrance that would combine the core values of the brand with the blue color, resulting in a combination of exhilarating fresh notes enhanced with spicy notes, and balanced by the intense power of amber.',
          normalPrice: 625000,
          price: 575000,
          quantity: 10,
          weight: 1
        })
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('DILARANG UPDATE JIKA BUKAN ADMIN');

          done();
        })
    })

    it('should return status code 200 and get all products', function(done) {
      chai
        .request(app)
        .get(`/products/${productId}`)
        
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
   
          done();
        })
    })

    it('should return status code 200 and get single products', function(done) {
      chai
        .request(app)
        .get('/products/')
        
        .end(function(err, res) {
          expect(err).to.be.null;

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
   
          done();
        })
    })
  })
})