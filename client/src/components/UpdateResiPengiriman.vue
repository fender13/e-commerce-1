<template>
  <div class="dashboard-page">
    <div>
      <h1>Update Resi Pengiriman</h1>
    </div>
    <div class="input-new-post">
      <b-form v-on:submit.prevent="updateResi">
        <b-row class="mb-3">
          <b-col>
            <label for="username">Update Resi:</label>
            <b-form-input
              id="resi"
              v-model="resiKirim"
              type="text"
              placeholder="Enter your resi pengiriman"
            />
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col class="text-center">
            <button type="submit" class="btn btn-outline-primary">Update Resi</button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from '@/database/server'
import router from '@/router'

export default {
  name: 'UpdateResiPengiriman',
  data () {
    return {
      resiKirim: ''
    }
  },
  methods: {
    updateResi () {
      console.log('masuk')
      axios
        .put(`/purchase/resi-kirim/${this.$route.params.id}`, {
          resiKirim: this.resiKirim
        })
        .then(({ data }) => {
          router.push('/dashboard/order-history')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.input-new-post {
  margin-top: 5%;
  margin-left: 25%;
  margin-right: 25%;
}

.input-new-create {
  text-align: center;
}

.button-status {
  width: 100%;
  margin-top: 5%;
  margin-left: 25%;
  margin-right: 25%;
  text-align: center;
}

.input-new-create {
  text-align: center;
}
</style>
