import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/database/server'
import swal from 'sweetalert'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    isLogin: false,
    username: '',
    role: '',
    errorFirstName: '',
    errorLastName: '',
    errorEmail: '',
    errorUsername: '',
    errorPassword: '',
    errorLogin: '',
    allProduct: [],
    cart: []
  },
  mutations: {
    setFirstNameError(state, payload) {
      state.errorFirstName = payload
    },
    setLastNameError(state, payload) {
      state.errorLastName = payload
    },
    setEmailError(state, payload) {
      state.errorEmail = payload
    },
    setUsernameError(state, payload) {
      state.errorUsername = payload
    },
    setPasswordError(state, payload) {
      state.errorPassword = payload
    },
    setId(state, payload) {
      state.id = payload
    },
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setRole(state, payload) {
      state.role = payload
    },
    setErrorLogin(state, payload) {
      state.errorLogin = payload
    },
    setItemCart(state, payload) {
      state.cart.push(payload)
    },
    setSavedCart(state, payload) {
      state.cart = payload
    }
  },
  actions: {
    verifyToken({ commit }, { isToken }) {
      axios
        .get('/verify', {
          headers: {
            token: isToken
          }
        })
        .then(({ data }) => {
          commit('setId', data.id)
          commit('setIsLogin', true)
          commit('setUsername', data.username)
          commit('setRole', data.role)
        })
        .catch(({ response }) => {
          commit('setId', '')
          commit('setIsLogin', false)
          commit('setUsername', '')
          commit('setRole', '')
        })
    },
    userRegistration({ commit }, { firstName, lastName, username, email, password }) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
      }

      axios
        .post('/register', data)
        .then(({ data }) => {
          router.push('/')
          swal("Register berhasil!!", "Harap LOGIN terlebih dahulu untuk melanjutkan!!", "success")
        })
        .catch(({ response }) => {
          if (response.data) {
            if (response.data.firstName != undefined) {
              commit('setFirstNameError', response.data.firstName.message)
            } else {
              commit('setFirstNameError', '')
            }

            if (response.data.lastName != undefined) {
              commit('setLastNameError', response.data.lastName.message)
            } else {
              commit('setLastNameError', '')
            }

            if (response.data.email != undefined) {
              commit('setEmailError', response.data.email.message)
            } else {
              commit('setEmailError', '')
            }

            if (response.data.username != undefined) {
              commit('setUsernameError', response.data.username.message)
            } else {
              commit('setUsernameError', '')
            }

            if (response.data.password != undefined) {
              commit('setPasswordError', response.data.password.message)
            } else {
              commit('setPasswordError', '')
            }
          }
        })
    },
    userLogin({ commit }, { username, password }) {
      const data = {
        username: username,
        password: password
      }
      axios
        .post('/login', data)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('setId', data.id)
          commit('setIsLogin', true)
          commit('setUsername', data.username)
          commit('setRole', data.role)
          router.push('/')
          swal("Welcome", data.username, "success")
        })
        .catch(({ response }) => {
          if (response.data) {
            if (response.data.message != undefined) {
              commit('setErrorLogin', response.data.message)
            } else {
              commit('setErrorLogin', '')
            }
          }
        })
    },
    addToCart({ commit }, { productId }) {
      const data = {
        productId: productId
      }
      axios
        .post(`/carts`, data)
        .then(({ data }) => {
          commit('setItemCart', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getCartDetails({ commit }) {
      axios
        .get('/carts')
        .then(({ data }) => {
          commit('setSavedCart', data.ProductId)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    userLogout({ commit }) {
      localStorage.clear()
      commit('setId', '')
      commit('setIsLogin', false)
      commit('setUsername', '')
      commit('setRole', '')
      router.push('/')
      swal("Good Bye", "success")
    },
    updateCartItems({ commit }, { productId }) {

    }
    
  },
  getters: {
    errorFirstName(state) {
      return state.errorFirstName
    },
    errorLastName(state) {
      return state.errorLastName
    },
    errorEmail(state) {
      return state.errorEmail
    },
    errorUsername(state) {
      return state.errorUsername
    },
    errorPassword(state) {
      return state.errorPassword
    },
    errorLogin(state) {
      return state.errorLogin
    },
    isLogin(state) {
      return state.isLogin
    },
    isUsername(state) {
      return state.username
    },
    role(state) {
      return state.role
    },
    cart(state) {
      return state.cart
    }
  }
})
