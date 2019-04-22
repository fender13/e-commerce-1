<template>
  <div class="add-product-container">
    <div class="add-brand-title">
      <h1>Add New Product</h1>
    </div>
    <div class="form-add-product">
      <b-form v-on:submit.prevent="addNewProduct">
        <b-form-group
          id="input-group-product"
          label="Product Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="productName"
            type="text"
            required
            placeholder="Enter Product Name"
          ></b-form-input>
        </b-form-group>

        <!-- =============================================================== -->

        <b-form-group
          id="input-group-product"
          label="Short Descriptions:"
          label-for="input-1"
        >
          <b-form-textarea
          id="textarea-state"
          v-model="shortDescription"
          :state="shortDescription.length <= 200"
          placeholder="Enter max 200 characters"
          rows="3"
          ></b-form-textarea>
        </b-form-group>

        <!-- =============================================================== -->

        <b-form-group
          id="input-group-product"
          label="Tags:"
          label-for="input-1"
        >
          <input-tag v-model="tags"></input-tag>
        </b-form-group>

        <!-- =============================================================== -->

        <b-form-group
          id="input-group-product"
          label="Product Descriptions:"
          label-for="input-1"
        >
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </b-form-group>

        <!-- =============================================================== -->

        <b-row id="input-group-product">
          <b-col>
            <b-form-group id="input-group-product" label="Brands:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="brand"
                :options="brands"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-product"
              label="Normal Price:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="normalPrice"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-product"
              label="Price:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="price"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- =============================================================== -->

        <b-row id="input-group-product">
          <b-col>
            <b-form-group
                id="input-group-product"
                label="Quantity:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="quantity"
                  type="number"
                  required
                ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-product"
              label="Weight in kilos: "
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="weight"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- =============================================================== -->

        <b-form-group id="input-group-product" label="Product Image:" label-for="input-2">
          <input type="file" ref="file" :value="file" @change="onImageChange()" />
        </b-form-group>

        <!-- =============================================================== -->

        <div class="submit-button">
          <b-button type="submit" variant="primary">Add New Product - Save</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from '@/database/server'
import InputTag from 'vue-input-tag'
import router from '@/router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
console.log('sini')
export default {
  name: 'AddNewProducts',
  data() {
    return {
      productName: '',
      shortDescription: '',
      tags: [],
      brands: [{ text: 'Select One', value: null }],
      brand: '',
      normalPrice: 0,
      price: 0,
      quantity: 0,
      weight: 0,
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      file: '',
      fileName: ''
    }
  },
  components: {
    InputTag
  },
  mounted() {
    console.log('masuk')
    this.getAllBrands()
  },
  methods: {
    getAllBrands() {
      axios
        .get(`/brands`)
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            this.brands.push(data[i].brandName)
          }
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    addNewProduct() {
      let dataFormat = new FormData()

      dataFormat.append("productName", this.productName)
      dataFormat.append("shortDescription", this.shortDescription)
      dataFormat.append("tags", this.tags)
      dataFormat.append("brand", this.brand)
      dataFormat.append("productDescription", this.editorData)
      dataFormat.append("normalPrice", this.normalPrice)
      dataFormat.append("price", this.price)
      dataFormat.append("quantity", this.quantity)
      dataFormat.append("weight", this.weight)
      dataFormat.append("image", this.$refs.file.files[0])

      axios
        .post(`/products/upload`, dataFormat)
        .then(({ data }) => {
          router.push('/dashboard/catalogue')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    onImageChange() {
      this.fileName = this.$refs.file.files[0].name
    }
  }
}
</script>

<style scoped>
.add-product-container {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.form-add-product {
  margin-top: 5%;
}

.submit-button {
  margin-top: 5%;
  margin-bottom: 5%;
  text-align: center;
}

.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred {
  min-height: 300px;
}

#input-group-product {
  margin-bottom: 3%;
}
</style>
