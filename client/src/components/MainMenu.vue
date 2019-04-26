<template>
  <div class="main-header">
    <div class="header-container">
      <div class="main-logo">
        <router-link to="/"><img src="../assets/my-logo.png" alt="Perfume Shop"></router-link>
      </div>
      <div class="main-menu">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/shop">Shop</router-link></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Portofolio</a></li>
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="side-menu">
        <div class="search-box">
          <div class="search-container">
            <form action="">
                <input type="search">
                <i class="fa fa-search"></i>
            </form>
          </div>
        </div>
        <div class="whislist-button">
          <i class="far fa-heart"></i>
          <!-- <span class='badge badge-warning' id='lblCartCount'> 5 </span> -->
        </div>
        <div class="cart-button main-cart">
          <div v-if="cart[0].length == 0">
            <i class="fa" style="font-size:24px">&#xf07a;</i>
            <span class='badge badge-warning' id='lblCartCount'>{{ cart[0].length }}</span>
          </div>
          <div v-else>
            <b-dropdown variant="link" right size="lg" no-caret class="main-cart">
              <template slot="button-content">
                <i class="fa" style="font-size:24px">&#xf07a;</i>
                <span class='badge badge-warning' id='lblCartCount'>{{ cart[0].length }}</span>
              </template>
              <b-dropdown-item>
                <table>
                  <thead class="table-head">
                    <th class="productName">Name</th>
                    <th class="totalQuantity">Quantity</th>
                    <th class="totalPurchase">Price</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cart[1]" :key="index">
                      <td>{{ item.productName }}</td>
                      <td>{{ cart[2][index] }}</td>
                      <td>Rp  {{ formatPrice(cart[2][index] * item.price) }}</td>
                    </tr>
                    <tr class="total-price">
                      <th>Total</th>
                      <td></td>
                      <td>Rp  {{ formatPrice(cart[3]) }}</td>
                    </tr>
                  </tbody>
                </table>
              </b-dropdown-item>

              <b-dropdown-item><b-button block variant="primary" class="checkout-button" v-on:click.prevent="goToCheckoutPage">Check Out</b-button></b-dropdown-item>
            </b-dropdown>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'MainMenu',
  data () {
    return {

    }
  },
  mounted () {
    this.getCartDetails()
  },
  computed: {
    cart () {
      let cartItem = []
      cartItem = this.$store.getters.cart

      let arr = []
      for (let i = 0; i < cartItem.length; i++) {
        let same = false
        for (let j = 0; j < arr.length; j++) {
          if (cartItem[i].productName == arr[j].productName) {
            same = true
          }
        }

        if (same == false) {
          arr.push(cartItem[i])
        }
      }

      let arrCount = []
      for (let j = 0; j < arr.length; j++) {
        let count = 0

        for (let i = 0; i < cartItem.length; i++) {
          if (arr[j].productName == cartItem[i].productName) {
            count++
          }
        }

        arrCount.push(count)
      }

      let total = 0
      for (let i = 0; i < cartItem.length; i++) {
        total += cartItem[i].price
      }

      return [cartItem, arr, arrCount, total]
    }
  },
  methods: {
    getCartDetails () {
      this.$store.dispatch('getCartDetails')
    },
    formatPrice (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    goToCheckoutPage () {
      router.push('/check-out')
    }
  }

}
</script>

<style scoped>
.main-header {
  width: 100%;
  height: 100px;
  background-color: white;
}

.header-container {
  margin-left: 2%;
  margin-right: 2%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.main-logo {
  width: 30%;
}

.main-logo img {
  width: 40%;
}

.main-menu {
  margin: 0;
  width: 600px;
  text-align: center;
}

.main-menu dl, ol, ul {
  margin: 0;
}

.main-menu li {
  display: inline;
}

.main-menu li a {
  margin-left: 3%;
  text-decoration: none;
  color: black;
  font-weight: 500;
}

.main-menu ul li a:hover {
  color: #fc7753;
}

.side-menu {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  width: 30%;
  text-align: right;
}

.cart-button {
  margin-right: 2%;
}

#lblCartCount {
  font-size: 12px;
  background: #ff0000;
  color: #fff;
  padding: 0 5px;
  vertical-align: top;
  margin-left: -10px;
}
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}

.whislist-button {
  margin-right: 4%;
}

.whislist-button .far {
  height: 22.5px;
}

.search-box {
  height: 0%;
  margin-right: 4%;
  width: 5%;
  display: flex;
  align-items: center;
  text-align: right;
}

.search-container {
  width: 5%;
  display: table-cell;
  vertical-align: middle;
}

/* search box start */
form {
  float: right;
  position: relative;
  transition: width 0.5s;
  width: 30px;
  height: 30px;
  background: white;
  box-sizing: border-box;
  border-radius: 25px;
  border: 4px solid white;
}

input {
  position: absolute;
  width: 100%;
  height: 22.5px;
  padding: 10px;
  outline: 0;
  border: 0;
  display: none;
  font-size: 1em;
  border-radius: 20px;
  border: 1px solid black;
}

.search-box form .fa {
  box-sizing: border-box;
  padding: 2.5px;
  width: 22.5px;
  height: 22.5px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  color: #07051a;
  text-align: center;
  font-size: 1.2em;
  transition: width 1s;
}

form:hover {
  width: 175px;
  cursor: pointer;
}

form:hover input {
  display: block;
}

form:hover .fa {
  background: #07051a;
  color: white;
}

th.productName {
  min-width: 600px;
}

th.totalQuantity {
  min-width: 100px;
}

th.totalPurchase {
  min-width: 150px;
}

.total-price {
  border-top: 1px solid #fc7753;
}

.table-head {
  border-bottom: 1px solid #fc7753;
}

thead th {
  padding: 5px;
}

tbody tr td {
  padding: 5px;
}

.checkout-button {
  margin-top: 4%;
}
</style>
