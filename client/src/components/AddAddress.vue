<template>
  <div class="catalogue-container">
    <div class="catalogue-options">
      <div class="catalogue-title">
        <h5>Address</h5>
      </div>
      <div class="select-menu">
        <b-form-select
        class="select-options"
        v-model="menuOption"
        :options="options"
          >
        </b-form-select>
      </div>
    </div>
    <div>
      <ListAlamatPengiriman v-if="menuOption == 'Alamat'"></ListAlamatPengiriman>
      <NewAddressForm v-else></NewAddressForm>
    </div>
  </div>
</template>

<script>
import ListAlamatPengiriman from '@/components/AddressList.vue'
import NewAddressForm from '@/components/NewAddressForm.vue'

export default {
  name: 'DashboardAddAddress',
  data () {
    return {
      menuOption: 'Alamat',
      options: ['Alamat', 'Daftar Alamat']
    }
  },
  components: {
    ListAlamatPengiriman,
    NewAddressForm
  }
}
</script>

<style scoped>
.catalogue-container {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.catalogue-options {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2%;
  border-bottom: 1px solid #fc7753;
}

.select-menu {
  width: 250px;
}

.select-options {
  width: 100%;
}
</style>
