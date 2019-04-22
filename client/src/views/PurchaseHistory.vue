<template>
  <div class="history-container">
    <div class="add-brand-title">
      <h1>Purchase History</h1>
    </div>
    <div class="card-history">
        <b-card
        header="featured"
        header-tag="header"
        footer="Card Footer"
        footer-tag="footer"
        title="Title"
      >
        <b-card-text>Header and footers using props.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from '@/database/server'

export default {
  name: 'PurchaseHistory',
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
        .get('/purchase')
        .then(({ data }) => {
          this.allHistory = data
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
}
</style>
