<template>
  <div class="add-brand-container">
    <div class="add-brand-title">
      <h1>Add New Brand</h1>
    </div>
    <div class="form-add-brand">
      <b-form v-on:submit.prevent="addNewBrand">
        <b-form-group
          id="input-group-1"
          label="Brand Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="brandName"
            type="text"
            required
            placeholder="Enter Brand Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Brand Image:" label-for="input-2">
          <input type="file" ref="file" :value="file" @change="onImageChange()" />
        </b-form-group>

        <div class="submit-button">
          <b-button type="submit" variant="primary">Add New Brand - Save</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from '@/database/server'
import router from '@/router'

export default {
  name: 'AddNewBrand',
  data () {
    return {
      brandName: '',
      file: '',
      fileName: ''
    }
  },
  methods: {
    addNewBrand () {
      let dataFormat = new FormData()

      dataFormat.append('brandName', this.brandName)
      dataFormat.append('image', this.$refs.file.files[0])

      axios
        .post(`/brands/upload`, dataFormat)
        .then(({ data }) => {
          router.push('/dashboard/catalogue')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    onImageChange () {
      this.fileName = this.$refs.file.files[0].name
    }
  }
}
</script>

<style scoped>
.add-brand-container {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.form-add-brand {
  margin-top: 5%;
}

.submit-button {
  margin-top: 5%;
  text-align: center;
}
</style>
