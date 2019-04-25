<template>
  <div>
    <MainHeader></MainHeader>
    <div class="payment-shipping-container">
      <div v-if="listAlamat.length > 0">
        <b-form>
          <b-row>
            <b-col v-if="listService.length == 0">
              <b-form-group id="input-group-product" label="Tujuan:" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="destination"
                  :options="alamat"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col v-if="listService.length == 0">
              <b-form-group id="input-group-product" label="Pilih Courier:" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="targetCourier"
                  :options="courier"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col v-if="service.length > 1">
              <b-form-group id="input-group-product" label="Pilih Service:" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="targetService"
                  :options="service"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <div class="submit-pengiriman" v-if="listService.length == 0">
              <b-button block variant="primary" class="Add New Address" v-on:click.prevent="setPengiriman(cart[4])">Submit Courier</b-button>
            </div>
            <div class="set-summary-button" v-else-if="listService.length > 0">
              <b-button block variant="primary" class="Add New Address" v-on:click.prevent="setSummary()">Cek Summary</b-button>
            </div>
          </b-row>
        </b-form>
      </div>
      <div v-else class="not-found-container">
        <div class="not-found-title">
          <h5>Alamat Tidak Ditemukan</h5>
        </div>
        <div class="new-alamat-button" >
          <b-button block variant="primary" class="Add New Address" v-on:click.prevent="setAddress()"> Add New Address</b-button>
        </div>   
      </div>
    </div>
    <div class="main-table" v-if="finalService.hasOwnProperty('cost') ">
      <table>
        <thead>
          <th>No</th>
          <th>Keterangan</th>
          <th>Harga</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Total Belanja</td>
            <td>Rp  {{ formatPrice(cart[3]) }}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Pengiriman - {{ targetCourier }} - {{ targetService }}</td>
            <td>Rp  {{ formatPrice(finalService.cost[0].value) }}</td>
          </tr>
          <tr class="total-pembayaran">
            <th colspan="2" tyle="text-align:center">Total</th>
            <td style="text-align:center">Rp  {{ formatPrice(cart[3] + finalService.cost[0].value) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="form-pembayaran">
        <b-form>
          <b-form-group id="input-group-product" label="Metode Pembayaran:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="targetPembayaran"
              :options="pembayaran"
              required
            ></b-form-select>
          </b-form-group>
          <div class="set-pembayaran-button">
            <b-button block variant="primary" class="my-purchase" v-on:click.prevent="purchaseOrder(cart[0], cart[1], cart[2], cart[3], (cart[3] + finalService.cost[0].value), finalService.cost[0].value, targetCourier, targetService)">Process My Purchase</b-button>
          </div>
        </b-form>
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
  name: 'ShippingPayment'  ,
  data() {
    return {
      alamat: [{ text: 'Select One', value: null }],
      destination: '' ,
      listAlamat: [],
      courier: [{ text: 'Select One', value: null }, 'tiki', 'jne', 'pos'],
      targetCourier: '',
      listService: [],
      service: [{ text: 'Select One', value: null }],
      targetService: '',
      costPerKG: 0,
      totalOngkir: 0,
      finalDestination: {},
      finalService: {},
      pembayaran: [{ text: 'Select One', value: null }, 'Klik BCA', 'ATM Transfer', 'Mandiri VA'],
      targetPembayaran: ''
    }
  },
  components: {
    MainHeader,
    MainFooter
  },
  mounted() {
    this.getAddress()
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
    getAddress() {
      axios
        .get('/couriers/address')
        .then(({ data }) => {
          this.listAlamat = data

          for (let i = 0; i < data.length; i++) {
            this.alamat.push(data[i].addressName)
          }

          this.alamat.push(arr)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    setAddress() {
      router.push('/dashboard/add-address')
    },
    setPengiriman(totalWeight) {
      for (let i = 0; i < this.listAlamat.length; i++) {
        if (this.listAlamat[i].addressName == this.destination) {
          this.finalDestination = this.listAlamat[i]
        }
      }

      const allWeight = totalWeight * 1000

      let data = {
        origin: 151,
        destination: this.finalDestination.cityId,
        weight: allWeight,
        courier: this.targetCourier
      }

      axios 
        .post('/couriers/cost', data)
        .then(({ data }) => {
          this.listService = data

          for (let i = 0; i < data.length; i++) {
            this.service.push(data[i].service)
          }
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    setSummary() {
      for (let i = 0; i < this.listService.length; i++) {
        if (this.listService[i].service == this.targetService) {
          this.finalService = this.listService[i]
        }
      }
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    purchaseOrder(allitems, items, quantity, totalBelanja, totalCost, serviceCost, fixedCourier, fixedService) {
      let data = {
        allitems: allitems,
        items: items, 
        quantity: quantity, 
        totalBelanja: totalBelanja, 
        totalCost: totalCost, 
        serviceCost: serviceCost, 
        fixedCourier: fixedCourier, 
        fixedService: fixedService,
        pembayaran: this.targetPembayaran,
        pengiriman: this.finalDestination
      }

      axios
        .post('/purchase', data)
        .then(({ data }) => {
          router.push('/')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
.payment-shipping-container {
  margin-top: 5%;
  margin-bottom: 5%;
  max-width: 100%;
  margin-left: 5%;
  margin-right: 5%;
}

.main-table {
  margin-top: 5%;
  margin-bottom: 5%;
  max-width: 100%;
  margin-left: 5%;
  margin-right: 5%;
}

.not-found-container {
  text-align: center;
}

.not-found-title {
  margin-bottom: 5%;
}

.new-alamat-button {
  margin-left: 25%;
  margin-right: 25%;
}

.submit-pengiriman {
  width: 100%;
  margin-top: 5%;
  margin-left: 25%;
  margin-right: 25%;
}

.set-summary-button {
  width: 100%;
  margin-top: 5%;
  margin-left: 25%;
  margin-right: 25%;
}

table {
  margin-top: 5%;
  width: 100%;
}

table thead {
  text-align: center;
  border-bottom: 1px solid #fc7753;
}

thead th {
  padding: 15px;
}

tbody tr {
  text-align: center;
}

tr td {
  padding: 15px;
}

tr td:nth-child(2) {
  text-align: left
}

.total-pembayaran {
  border-top: 1px solid #fc7753;
}

.set-pembayaran-button {
  /* width: 100%; */
  margin-top: 5%;
  margin-left: 25%;
  margin-right: 25%;
}
</style>
