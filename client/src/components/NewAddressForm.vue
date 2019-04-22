<template>
  <div class="form-address">
    <b-form v-on:submit.prevent="addNewAddress">
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Nama Contact:"
            label-for="input-1"
          >

            <b-form-input
              id="input-1"
              v-model="addressName"
              type="text"
              required
              placeholder="Enter Nama Alamat"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Penerima:"
            label-for="input-1"
          >

            <b-form-input
              id="input-1"
              v-model="penerima"
              type="text"
              required
              placeholder="Enter Nama Penerima"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="No Telp:"
            label-for="input-1"
          >

            <b-form-input
              id="input-1"
              v-model="contact"
              type="number"
              required
              placeholder="Enter Telp Number"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group
        id="input-group-1"
        label="Alamat Lengkap:"
        label-for="input-1"
      >

        <b-form-textarea
          id="textarea"
          v-model="alamat"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Kota:"
            label-for="input-1"
          >
            <b-form-input v-model="cityName" list="my-list-city"></b-form-input>

            <datalist id="my-list-city">
              <option>Manual Option</option>
              <option v-for="(area, index) in indonesiaArea" :key="index">{{ area.city_name }} - {{ area.city_id }}</option>
            </datalist>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Propinsi:"
            label-for="input-1"
          >
            <b-form-input v-model="provinceName" list="my-list-province"></b-form-input>

            <datalist id="my-list-province">
              <option>Manual Option</option>
              <option v-for="(area, index) in indonesiaArea" :key="index">{{ area.province }} - {{ area.province_id }}</option>
            </datalist>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Kode Pos:"
            label-for="input-1"
          >

            <b-form-input
              id="input-1"
              v-model="postalCode"
              type="number"
              required
              placeholder="Enter Address"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <div class="submit-button">
        <b-button type="submit" variant="primary">Add New Brand - Save</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from '@/database/server'
import router from '@/router'

export default {
  name: 'NewAddressForm',
  data() {
    return {
      indonesiaArea: [],
      addressName: '',
      penerima: '',
      contact: 0,
      alamat: '',
      cityId: 0,
      cityName: '',
      provinceId: '',
      provinceName: '',
      postalCode: 0
    }
  },
  mounted() {
    this.getArea()
  },
  computed: {

  },
  methods: {
    getArea() {
      axios
        .get('/couriers')
        .then(({ data }) => {
          this.indonesiaArea = data.rajaongkir.results
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    addNewAddress() {
      const split = this.cityName.split(' - ')
      const namaKota = split[0]
      this.cityId = split[1]

      const split2 = this.provinceName.split(' - ')
      const namaPropinsi = split2[0]
      this.provinceId = split2[1]

      const data = {
        addressName: this.addressName,
        penerima: this.penerima,
        contact: this.contact,
        alamat: this.alamat,
        cityId: this.cityId,
        cityName: namaKota,
        provinceId: this.provinceId,
        provinceName: namaPropinsi,
        postalCode: this.postalCode
      }

      axios
        .post('/couriers', data)
        .then(({ data }) => {
          router.push('/dashboard/add-address')
        })
        .catch(({ response }) => {
          console.log(response)
        })
      
    }
  }
}
</script>

<style scoped>
.form-address {
  margin-top: 5%;
}

.submit-button {
  margin-top: 5%;
  text-align: center;
}
</style>
