<template>
  <div>
    <MainHeader></MainHeader>
    <div class="container">
      <!-- Left Column / Headphones Image -->
      <div class="left-column">
        <img class="active" v-bind:src="productPicture" alt="">
      </div>


      <!-- Right Column -->
      <div class="right-column">

        <!-- Product Description -->
        <div class="product-description">
          <h1>{{ productName }}</h1>
          <p v-html="shortDescriptions">{{ shortDescriptions }}</p>
        </div>

        <!-- Product Pricing -->
        <div class="product-price" v-if="price > 0">
          <div class="normal-price">
            <span><strike>Rp  {{ formatPrice(normalPrice) }}</strike></span>
          </div>
          <div>
            <span>Rp  {{ formatPrice(price) }}</span>
          </div>
        </div>

        <div class="product-price" v-else>
          <div class="normal-price">
            <span>Rp  {{ formatPrice(normalPrice) }}</span>
          </div>
        </div>

        <div class="opsi-button">
          <div v-if="errorQuantity == ''">
            <a href="#" class="cart-btn"  v-on:click.prevent="addToCart()">Add to cart</a>
            
          </div>
          <div v-else class="button-cart">
            <a class="cart-btn" v-on:click.prevent="addToCart()">Add to cart</a>
            <p v-if="errorQuantity != ''">{{ errorQuantity }}</p>
          </div>
        </div>

        <div>
          <div>
            <p>weight: {{ weight }} kg</p>
          </div>
          <div class="brand-img">
            <img class="active" v-bind:src="brandImage" alt="">
          </div>
          <div>
            <p>Tags: <span class="w3-tag w3-blue main-tag" v-for="(tag, index) in tags" :key="index"><a href="#" v-on:click.prevent="getArticlesByTag(tag)">{{ tag }}</a></span></p>
          </div>
        </div>

      </div>
    </div>
    <div class="container description">
      <p v-html="productDescriptions">{{ productDescriptions }}</p>
    </div>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
import axios from '@/database/server'
import router from '@/router'
import MainHeader from '@/views/Header.vue'
import MainFooter from '@/components/Footer.vue'

export default {
  name: 'ProductPage',
  data() {
    return {
      productId: '',
      productName: '',
      shortDescriptions: '',
      normalPrice: 0,
      price: 0,
      weight: 0,
      brandName: '',
      brandImage: '',
      productPicture: '',
      productDescriptions: '',
      tags: [],
      errorQuantity: '',
      quantity: 0,
      count: 0
    }
  },
  components: {
    MainHeader,
    MainFooter
  },
  mounted() {
    this.getSingleProduct(this.$route.params.id)
    this.count = 0
    this.cekStock()
  },
  computed: {
    cart() {
      let cartItem = []
      cartItem = this.$store.getters.cart
      let count = 0

      for (let i = 0; i < cartItem.length; i++) {
        if (cartItem[i]._id == this.productId) {
          count++
        }
      }

      this.count = count
    },
  },
  methods: {
    getSingleProduct(id) {
      axios
        .get(`products/${id}`)
        .then(({ data }) => { 
          this.productId = data._id
          this.productName = data.productName
          this.shortDescriptions = data.shortDescriptions
          this.productPicture = data.productPicture
          this.normalPrice = data.normalPrice
          this.price = data.price
          this.weight = data.weight
          this.productDescriptions = data.productDescriptions
          this.tags = data.tags
          this.brandImage = data.brand.brandPicture
          this.quantity = data.quantity
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    cekStock() {
      this.$store.dispatch('getCartDetails')
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    addToCart() {
      if (this.$store.state.isLogin == false) {
        router.push('/member-area')
      } else {
        this.count++

        if (this.count > this.quantity || this.quantity - this.count == -1) {
          this.errorQuantity = 'Jumlah pesanan telah mencapai limit!!'
        } else {
          this.$store.dispatch('addToCart', {
            productId: this.productId
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
}

/* Columns */
.left-column {
  width: 50%;
  position: relative;
}

.right-column {
  width: 50%;
  margin-top: 60px;
}

/* Left Column */
.left-column img {
  width: 50%;
  margin-left: 20%;
  position: absolute;
  left: 0;
  top: 100px;
  opacity: 0;
  transition: all 0.3s ease;
}

.left-column img.active {
  opacity: 1;
}

/* Right Column */

/* Product Description */
.product-description {
  border-bottom: 1px solid #E1E8EE;
  margin-bottom: 20px;
}
.product-description span {
  font-size: 12px;
  color: #358ED7;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
}
.product-description h1 {
  font-weight: 300;
  font-size: 24px;
  color: #43484D;
  letter-spacing: -2px;
}
.product-description p {
  font-size: 14px;
  font-weight: 300;
  color: #86939E;
  line-height: 24px;
}

/* Product Configuration */
.product-color span,
.cable-config span {
  font-size: 14px;
  font-weight: 400;
  color: #86939E;
  margin-bottom: 20px;
  display: inline-block;
}

/* Product Color */
.product-color {
  margin-bottom: 30px;
}

.color-choose div {
  display: inline-block;
}

.color-choose input[type="radio"] {
  display: none;
}

.color-choose input[type="radio"] + label span {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: -1px 4px 0 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;
}

.color-choose input[type="radio"] + label span {
  border: 2px solid #FFFFFF;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.33);
}

.color-choose input[type="radio"]#red + label span {
  background-color: #C91524;
}
.color-choose input[type="radio"]#blue + label span {
  background-color: #314780;
}
.color-choose input[type="radio"]#black + label span {
  background-color: #323232;
}

.color-choose input[type="radio"]:checked + label span {
  /* background-image: url(images/check-icn.svg); */
  background-repeat: no-repeat;
  background-position: center;
}

/* Cable Configuration */
.cable-choose {
  margin-bottom: 20px;
}

.cable-choose button {
  border: 2px solid #E1E8EE;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  color: #5E6977;
  background-color: #fff;
  cursor: pointer;
  transition: all .5s;
}

.cable-choose button:hover,
.cable-choose button:active,
.cable-choose button:focus {
  border: 2px solid #86939E;
  outline: none;
}

.cable-config {
  border-bottom: 1px solid #E1E8EE;
  margin-bottom: 20px;
}

.cable-config a {
  color: #358ED7;
  text-decoration: none;
  font-size: 12px;
  position: relative;
  margin: 10px 0;
  display: inline-block;
}
.cable-config a:before {
  content: "?";
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 2px solid rgba(53, 142, 215, 0.5);
  display: inline-block;
  text-align: center;
  line-height: 16px;
  opacity: 0.5;
  margin-right: 5px;
}

/* Product Price */
.product-price {
  display: flex;
  align-items: center;
}

.product-price span {
  font-size: 26px;
  font-weight: 300;
  color: #43474D;
  margin-right: 20px;
}

.cart-btn {
  display: inline-block;
  background-color: #fc7753;
  border-radius: 6px;
  font-size: 16px;
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  transition: all .5s;
}
.cart-btn:hover {
  background-color: #fc7753;
}

/* Responsive */
@media (max-width: 940px) {
  .container {
    flex-direction: column;
    margin-top: 60px;
  }

  .left-column,
  .right-column {
    width: 100%;
  }

  .left-column img {
    width: 300px;
    right: 0;
    top: -65px;
    left: initial;
  }
}

@media (max-width: 535px) {
  .left-column img {
    width: 220px;
    top: -85px;
  }
}

.description {
  margin-top: 3%;
  margin-bottom: 5%;
}

.opsi-button {
  margin-top: 5%;
  margin-bottom: 5%;
}

.main-tag  {
  margin-left: 1%;
}

.brand-img {
  width: 100%;
  height: 100%;
  margin-bottom: 5%;
}

.button-cart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.button-cart p {
  color: red;
  margin-left: 3%;
}

</style>
