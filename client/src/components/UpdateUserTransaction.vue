<template>
  <div class="dashboard-page">
    <div>
      <h1>Upload Bukti Pembayaran</h1>
    </div>
    <div class="input-new-post">
      <form enctype="multipart/form-data" v-on:submit.prevent="updateImage">
        <div class="image-container">
          <img v-bind:src="image" alt="">
        </div>
        <div class="custom-file mt-4">
          <input type="file" ref="file" :value="file" @change="onImageChange()" required/>
        </div>
        <div class="input-new-create mt-5">
          <button type="submit" class="btn btn-outline-primary">Update Post Image - Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/database/server'
import router from '@/router'

export default {
  name: 'UploadResi',
  data () {
    return {
      image: '',
      file: '',
      fileName: ''
    }
  },
  methods: {
    updateImage () {
      let dataFormat = new FormData()

      dataFormat.append('image', this.$refs.file.files[0])

      axios
        .put(`/purchase/${this.$route.params.id}`, dataFormat)
        .then(({ data }) => {
          router.push('/dashboard/purchase-history')
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
.dashboard-page {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.input-new-post {
  margin-top: 5%;
}

.input-new-create {
  text-align: center;
}
</style>
