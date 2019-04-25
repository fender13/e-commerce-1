<template>
  <div>
    <MainHeader></MainHeader>
    <div class="table-container">
      <div class="page-title">
        <h1>Purchase Summary</h1>
      </div>
      <table>
        <thead class="table-head">
          <th class="no" style="text-align:center">No</th>
          <th class="image" style="text-align:center">Image</th>
          <th class="productName" style="text-align:center">Name</th>
          <th class="totalQuantity" style="text-align:center">Stock</th>
          <th class="totalQuantity" style="text-align:center">Quantity</th>
          <th class="totalQuantity" style="text-align:center">Weight</th>
          <th class="price" style="text-align:center">Price</th>
          <th class="price" style="text-align:center">Options</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart[1]" :key="index">
            <td style="text-align:center">{{ index + 1 }}</td>
            <td style="text-align:center"><img v-bind:src="item.productPicture" alt=""></td>
            <td>{{ item.productName }} <p class="error" v-if="error[index] == false">Stok tidak mencukupi!!</p> </td>
            <td style="text-align:center">{{ item.quantity }}</td>
            <td style="text-align:center">{{ cart[2][index] }}</td>
            <td style="text-align:center">{{ item.weight * cart[2][index] }}</td>
            <td style="text-align:center">Rp  {{ formatPrice(cart[2][index] * item.price) }}</td>
            <td style="text-align:center">
              <router-link to="/dashboard/catalogue">
                <a class="nav-link" href="#" v-on:click.prevent="updateCart(cart[0], item._id)">
                  <i class="fas fa-trash-alt icon-trash"></i>
                  <span>Delete</span></a>
              </router-link>
            </td>
          </tr>
          <tr class="total-price">
            <th colspan="6" tyle="text-align:center">Total</th>
            <td tyle="font-size:20px">{{ cart[4] }} Kg</td>
            <td>Rp  {{ formatPrice(cart[3]) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="next-page">
        <b-button block variant="primary" class="checkout-button" v-on:click.prevent="goToSetAddress(cart[1], cart[2])">Set Recipient Address</b-button>
      </div>
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
  name: 'CheckOutSummart',
  data() {
    return {
      error: []
    }
  },
  components: {
    MainHeader,
    MainFooter
  },
  mounted() {
    this.getCartDetails()
  },
  computed: {
    cart() {
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

      let totalWeight = 0
      for (let i = 0; i < cartItem.length; i++) {
        totalWeight += cartItem[i].weight
      }
      
      return [cartItem, arr, arrCount, total, totalWeight]
    }
  },
  methods: {
    getCartDetails() {
      this.$store.dispatch('getCartDetails')
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatPercent(normalPrice, price) {
      let percent = Math.round((price - normalPrice)/normalPrice * 100)

      return percent
    },
    goToSetAddress(items, quantity) {
      axios
        .post('/carts/verify-stock', {
          items: items,
          quantity: quantity
        })
        .then(({ data }) => {
          router.push('/check-out-shipping-payment')
        })
        .catch(({ response }) => {
          if (response.data) {
            this.error = response.data.message
          }
        })
    },
    updateCart(list, productId) {
      axios
        .delete(`/carts/${productId}`)
        .then(({ data }) => {
          this.getCartDetails()
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
.table-container {
  max-width: 100%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
}

th.no {
  width: 50px;
}

td img {
  width: 120px;
}

th.image {
  width: 200px;
}

th.productName {
  width: 400px;
}

th.totalQuantity {
  width: 90px;
}

th.normalPrice {
  width: 5%;
}

th.price {
  width: 250px;
}

.page-title {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
}

.page-title h1 {
  font-size: 30px;
  font-weight: 500%;
}

.table-head {
  border-bottom: 1px solid #fc7753;
}

thead th {
  padding: 10px;
}

.total-price {
  border-top: 1px solid #fc7753;
}

.total-price th, td {
  padding-top: 50px;
  padding-bottom: 50px
}

.total-price th {
  font-size: 20px;
}

.checkout-button {
  width: 250px;
}

.next-page {
  display: flex;
  justify-content: flex-end;
}

.error {
  color: red;
}

.icon-trash {
  margin-right: 4%;
}
</style>
