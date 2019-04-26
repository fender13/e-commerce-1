<template>
  <div class="catalogue-container">
    <div class="catalogue-options">
      <div class="catalogue-title">
        <h5>Catalogue List</h5>
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
      <DashboardProductList v-if="menuOption == 'Products'"></DashboardProductList>
      <DashboardBrandList v-else></DashboardBrandList>
    </div>
  </div>
</template>

<script>
import DashboardProductList from '@/components/ProductListDashboard.vue'
import DashboardBrandList from '@/components/BrandListDashboard.vue'

export default {
  name: 'MainCatalogue',
  data () {
    return {
      menuOption: 'Products',
      options: ['Products', 'Brands']
    }
  },
  components: {
    DashboardProductList,
    DashboardBrandList
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

.catalogue-title {
  font-weight: 400%;
}
</style>
