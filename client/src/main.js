import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use(BootstrapVue)

Vue.use(CKEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    this.$store.dispatch('verifyToken', {
      isToken: localStorage.getItem('token')
    })
  },
  render: h => h(App)
}).$mount('#app')
