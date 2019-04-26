<template>
  <div class="main-container">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
            <b-input-group>
              <b-form-select v-model="sortBy" :options="sortOptions">
                <option slot="first" :value="null">-- none --</option>
              </b-form-select>
              <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
                <option :value="false">Asc</option> <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
            <b-input-group>
              <b-form-select v-model="sortDirection" slot="append">
                <option value="asc">Asc</option> <option value="desc">Desc</option>
                <option value="last">Last</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
            <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        class="main-table"
        show-empty
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >

        <template slot="actions">
          <b-dropdown id="dropdown-right" right text="Options" variant="transparent" class="button-options">
            <b-dropdown-item><router-link to="/">Update Product</router-link></b-dropdown-item>
            <b-dropdown-item><router-link to="/">Update Image</router-link></b-dropdown-item>
            <b-dropdown-item><router-link to="/">Delete Product</router-link></b-dropdown-item>
          </b-dropdown>
        </template>

        <template slot="row-details" slot-scope="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <b-row class="pagination-button">
        <b-col md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import axios from '@/database/server'

export default {
  name: 'DashboardProductList',
  data () {
    return {
      listProducts: [],
      items: [],
      fields: [
        { key: 'productName', label: 'Product Name', sortable: true, sortDirection: 'desc' },
        { key: 'brand.brandName', label: 'Brand', sortable: true, sortDirection: 'desc' },
        { key: 'quantity', label: 'Quantity', sortable: true, sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 20],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    // Set the initial number of items
    this.getAllProductList()
  },
  methods: {
    getAllProductList () {
      axios
        .get('/products')
        .then(({ data }) => {
          this.items = data
          this.totalRows = this.items.length
        })
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.main-container {
  margin-top: 3%;
}

.button-options {
  padding: 0;
}

.main-table {
  margin-top: 3%;
}

.pagination-button {
  text-align: center;
}

</style>
