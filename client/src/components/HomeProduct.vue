<template>
  <div class="grid-list">
    <b-container>
      <b-row class="text-center" >
        <b-col class="tagline">
          <div>
            <h1 class="text-center">Featured Product</h1>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="3" sm="6" v-for="(item, index) in home" :key="index">
          <div class="product-grid">
            <div class="product-image">
              <a href="#">
                <img class="pic-1" v-bind:src="item.productPicture">
              </a>
              <span class="product-trend-label" v-if="item.price > 0">{{ formatPercent(item.normalPrice, item.price) }} %</span>
            </div>
            <div class="product-content">
              <router-link  :to="{ name: 'ProductPage', params: { id: item._id, name: item.productName} }"><h3 class="title">{{ item.productName }}</h3></router-link>
              <div class="price" v-if="item.price == 0">{{ formatPrice(item.normalPrice) }}</div>
              <div class="price" v-else>
                <div class="normal-price">
                  Rp  {{ formatPrice(item.normalPrice) }}
                </div>
                <div>
                  Rp  {{ formatPrice(item.price) }}
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from '@/database/server'

export default {
  name: 'HomeProductGrid',
  data() {
    return {
      home: []
    }
  },
  mounted() {
    this.setHomeProduct()
  },
  methods: {
    setHomeProduct() {
      axios
        .get('/products') 
        .then(({ data }) => {
          let random = []

          while (random.length != 8) {
            let getRandom = Math.floor(Math.random() * data.length - 1) + 1
            let same = false

            for (let j = 0; j < random.length; j++) {
              if (random[j] == getRandom) {
                same = true
              }
            }

            if (same == false) {
              random.push(getRandom)
            }
          }

          const homeProduct = []

          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < random.length; j++) {
              if (i == random[j]) {
                homeProduct.push(data[i])
              }
            }
          }
        
          this.home = homeProduct
        })
        .catch(({ response}) => {
          console.log(response)
        })
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatPercent(normalPrice, price) {
      let percent = Math.round((price - normalPrice)/normalPrice * 100)

      return percent
    }
  }
}
</script>

<style scoped>
.tagline {
  margin-top: 1%;
  margin-bottom: 5%;
}

.grid-list {
  margin-top: 5%;
  margin-bottom: 10%;
}

:root{ --main-color: #d49d97; }
.product-grid{
  /* font-family: 'Roboto', sans-serif; */
  position: relative;
  margin-bottom: 20%;
}

.product-grid .product-image{
  overflow: hidden;
  position: relative;
}

.product-grid .product-image:before{
  content: "";
  background: rgba(0,0,0,0.3);
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: all 0.4s ease-out 0s;
}

.product-grid:hover .product-image:before{ opacity: 1; }
.product-grid .product-image a{ display: block; }
.product-grid .product-image img{
  width: 100%;
  height: auto;
}

.product-image .pic-1{
  opacity: 1;
  backface-visibility: hidden;
  transition: all 0.4s ease-out 0s;
}

/* .product-grid:hover .product-image .pic-1{ opacity: 0; }
.product-image .pic-2{
  width: 100%;
  height: 100%;
  opacity: 0;
  backface-visibility: hidden;
  transform: scale(3);
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.4s ease-out 0s;
}

.product-grid:hover .product-image .pic-2 {
  opacity: 1;
  transform: scale(1);
} */

.product-image .product-trend-label,
.product-image .product-discount-label{
  content: "";
  color: #fff;
  background-color: red;
  font-size: 12px;
  line-height: 28px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  padding: 0 7px;
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 3;
}

.product-image .product-discount-label{
  background-color: var(--main-color);
  left: auto;
  right: 12px;
}

.product-grid .social {
  padding: 0;
  margin: 0;
  list-style: none;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  left: 10px;
  z-index: 4;
}

.product-grid .social li {
  margin: 0 0 12px;
  opacity: 0;
  transform: translateX(-60px);
  transition: transform .3s ease-out 0s;
}

.product-grid:hover .social li {
  opacity: 1;
  transform: translateX(0);
}

.product-grid:hover .social li:nth-child(2){ transition-delay: 0.1s; }
.product-grid:hover .social li:nth-child(3){ transition-delay: 0.2s; }
.product-grid:hover .social li:nth-child(4){ transition-delay: 0.3s; }
.product-grid .social li a {
  color: #fff;
  font-size: 22px;
  transition: all 0.3s;
}

.product-grid .social li a:hover { color: var(--main-color); }
.product-grid .social li a:before,
.product-grid .social li a:after{
  content: attr(data-tip);
  color: #000;
  background: #fff;
  font-size: 14px;
  padding: 5px 10px;
  white-space: nowrap;
  display: none;
  transform: translateY(-50%);
  position: absolute;
  left: 33px;
  top: 50%;
  transition: all 0.3s;
}

.product-grid .social li a:after{
  content: '';
  background: linear-gradient(-45deg, #fff 49%, transparent 50%);
  width: 10px;
  height: 10px;
  top: 40%;
  left: 20px;
}

.product-grid .social li a:hover:before,
.product-grid .social li a:hover:after{
  display: block;
}

.product-grid .product-content{ padding: 12px 0; }
.product-grid .title{
  font-size: 15px;
  font-weight: 400;
  text-transform: capitalize;
  margin: 0 0 5px;
}
.product-grid .title a{ color: #959595; }
.product-grid .title a:hover{ color: var(--main-color); }
.product-grid .price{
  color: #333;
  font-size: 14px;
  font-weight: 400;
}

.product-grid .price span{
  color: #333;
  text-decoration: line-through;
  margin-right: 3px;
}

.price {
  display: flex;
}

.normal-price {
  margin-right: 5px;
  text-decoration: line-through;
}

.product-grid .price.discount{ color: var(--main-color); }
@media only screen and (max-width:990px){
  .product-grid{ margin-bottom: 30px; }
}
.title {
  color: black;
  text-decoration: none;
}
</style>
