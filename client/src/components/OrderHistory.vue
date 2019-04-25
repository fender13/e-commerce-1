<template>
  <div class="history-container">
    <div class="add-brand-title">
      <h1>Order History</h1>
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
                <b-card-text style="text-align:left">Status Pembayaran: Belum Bayar</b-card-text>
              </div>
              <div v-if="item.statusPembayaran == 'pending'">
                <b-card-text style="text-align:left">Status Pembayaran: Pending</b-card-text>
              </div>
              <div v-if="item.statusPembayaran == 'true'">
                <b-card-text style="text-align:left">Status Pembayaran: Lunas</b-card-text>
              </div>
            </b-col>
            <b-col>
              <div v-if="item.statusPengiriman == 'false'">
                <b-card-text style="text-align:left">Status Pengiriman: Belum Dikirim</b-card-text>
              </div>
              <div v-if="item.statusPengiriman == 'pending'">
                <b-card-text style="text-align:left">Status Pengiriman: On Going</b-card-text>
              </div>
              <div v-if="item.statusPengiriman == 'true'">
                <b-card-text style="text-align:left">Status Pengiriman: Sudah Dikirim</b-card-text>
              </div>
            </b-col>
            <b-col>
              <div v-if="item.statusPenerimaan == 'false'">
                <b-card-text style="text-align:left">Status Pesanan: Pending</b-card-text>
              </div>
              <div v-if="item.statusPenerimaan == 'true'">
                <b-card-text style="text-align:left">Status Pesanan: Selesai</b-card-text>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
                <b-card-text style="text-align:left">Penerima: {{ item.alamatPengiriman.penerima }}</b-card-text>
            </b-col>
            <b-col>
                <b-card-text style="text-align:left">Alamat: {{ item.alamatPengiriman.alamat }}, {{ item.alamatPengiriman.cityName }}</b-card-text>
            </b-col>
            <b-col>
                <b-card-text style="text-align:left">Telp: {{ item.alamatPengiriman.contact }}</b-card-text>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
                <b-card-text style="text-align:left">Pembayaran: {{ item.metodePembayaran }}</b-card-text>
            </b-col>
            <b-col>
                <b-card-text style="text-align:left">Pengiriman: {{ item.metodePengiriman }}</b-card-text>
            </b-col>
            <b-col>
                <b-card-text style="text-align:left">Service: {{ item.servicePengiriman }}</b-card-text>
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
              <div v-if="item.linkPembayaran != 'null'">
                <a v-bind:href="item.linkPembayaran" target="_blank">Click Here To Check Resi Pembayaran</a> 
              </div>
            </b-col>
            <b-col>

            </b-col>
          </b-row>          
          <b-row class="mt-5" v-if="item.statusPenerimaan != 'true'">
            <div v-if="item.linkPembayaran != 'null'" class="button-status">
              <b-button block variant="primary" class="my-purchase" v-on:click.prevent="UpdateResi(item._id)">Update Resi Pengiriman</b-button>
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
  name: 'OrderHistory',
  data() {
    return {
      allHistory: []
    }
  },
  mounted() {
    this.getAllHistory()
  },
  methods: {
    getAllHistory() {
      axios
        .get('/purchase/all')
        .then(({ data }) => {
          this.allHistory = data.reverse()
        })
        .catch(({ response }) => {
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
    },
    formatDate(value) {
      return new Date(value).toLocaleString()
    },
    UpdateResi(id) {
      router.push(`/dashboard/update-resi-pengiriman/${id}`)
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

.button-status:nth-child(1) {
  margin-bottom: 3%;
}
</style>
