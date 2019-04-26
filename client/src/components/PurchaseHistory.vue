<template>
  <div class="history-container">
    <div class="add-brand-title">
      <h1>Purchase History</h1>
    </div>
    <div class="card-history">
      <div v-for="(item, index) in allHistory" :key="index" class="cards">
        <b-card border-variant="dark" header="Transaction Details" align="center" >

          <b-row>
            <b-col style="text-align:left">
              <b-card-text>No: {{ index + 1 }}</b-card-text>
            </b-col>
            <b-col>
              <b-card-text style="text-align:left">ID: {{ item._id }}</b-card-text>
            </b-col>
            <b-col>
              <b-card-text style="text-align:left">Date: {{ formatDate(item.createdAt) }}</b-card-text>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col style="text-align:left">
              <b-card-text>Total Belanja: Rp  {{ formatPrice(item.totalBelanja) }}</b-card-text>
            </b-col>
            <b-col>
              <b-card-text style="text-align:left">Total Ongkos Kirim: Rp  {{ formatPrice(item.ongkir) }}</b-card-text>
            </b-col>
            <b-col>
              <b-card-text style="text-align:left">Total Pembayaran: Rp  {{ formatPrice(item.totalBelanja) }}</b-card-text>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <div v-if="item.statusPembayaran == 'false'">
                <b-card-text style="text-align:left; color:red;">Status Pembayaran: Belum Bayar</b-card-text>
              </div>
              <div v-if="item.statusPembayaran == 'pending'">
                <b-card-text style="text-align:left; color:orange;">Status Pembayaran: Pending</b-card-text>
              </div>
              <div v-if="item.statusPembayaran == 'true'">
                <b-card-text style="text-align:left; color:green;">Status Pembayaran: Lunas</b-card-text>
              </div>
            </b-col>
            <b-col>
              <div v-if="item.statusPengiriman == 'false'">
                <b-card-text style="text-align:left; color:red;">Status Pengiriman: Belum Dikirim</b-card-text>
              </div>
              <div v-if="item.statusPengiriman == 'pending'">
                <b-card-text style="text-align:left; color:orange;">Status Pengiriman: On Going</b-card-text>
              </div>
              <div v-if="item.statusPengiriman == 'true'">
                <b-card-text style="text-align:left; color:green;">Status Pengiriman: Sudah Dikirim</b-card-text>
              </div>
            </b-col>
            <b-col>
              <div v-if="item.statusPenerimaan == 'false'">
                <b-card-text style="text-align:left; color:red;">Status Pesanan: Pending</b-card-text>
              </div>
              <div v-if="item.statusPenerimaan == 'true'">
                <b-card-text style="text-align:left; color:green;">Status Pesanan: Selesai</b-card-text>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>

            </b-col>
            <b-col>
              <div v-if="item.resiKirim != 'null'">
                <b-card-text style="text-align:left">Resi Kirim: {{ item.resiKirim }}</b-card-text>
              </div>
            </b-col>
            <b-col>

            </b-col>
          </b-row>
          <b-row class="mt-5">
            <div v-if="item.statusPembayaran == 'false'" class="button-status">
              <b-button block variant="primary" class="my-purchase" v-on:click.prevent="uploadBuktiTransfer(item._id)">Uplaod Bukti Transfer</b-button>
            </div>
            <div v-if="item.statusPengiriman == 'true' && item.statusPenerimaan != 'true'" class="button-status">
              <b-button block variant="primary" class="my-purchase" v-on:click.prevent="purchaseDone(item._id)">Selesai</b-button>
            </div>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/database/server'
import router from '@/router'

export default {
  name: 'PurchaseHistory',
  data () {
    return {
      allHistory: []
    }
  },
  mounted () {
    this.getAllHistory()
  },
  methods: {
    getAllHistory () {
      axios
        .get('/purchase')
        .then(({ data }) => {
          this.allHistory = data.reverse()
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    formatPrice (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatPercent (normalPrice, price) {
      let percent = Math.round((price - normalPrice) / normalPrice * 100)

      return percent
    },
    formatDate (value) {
      return new Date(value).toLocaleString()
    },
    uploadBuktiTransfer (id) {
      router.push(`/dashboard/upload-bukti-bayar/${id}`)
    },
    purchaseDone (id) {
      axios
        .put(`/purchase/selesai/${id}`)
        .then(({ data }) => {
          for (let i = 0; i < this.allHistory.length; i++) {
            if (this.allHistory[i]._id == data._id) {
              this.allHistory.splice(i, 1)
            }
          }

          this.allHistory.push(data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
.history-container {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
}

.card-history {
  margin-top: 5%;
}

.cards {
  margin-top: 5%;
}

.button-status {
  width: 100%;
  margin-left: 25%;
  margin-right: 25%;
  text-align: center;
}
</style>
