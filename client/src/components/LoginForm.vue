<template>
  <div>
    <h2 class="login-form">
      <img src="../assets/icon/login.png" alt>Login
    </h2>
    <div class="form-container login">
      <div class="error-login">
        <p>{{ errorLogin }}</p>
      </div>
      <b-form v-on:submit.prevent="userLogin">
        <b-row class="mb-3">
          <b-col>
            <label for="username">Username:</label>
            <b-form-input
              id="username"
              v-model="username"
              type="text"
              placeholder="Enter your username"
            />
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <label for="password">Password:</label>
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
            />
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <b-button type="submmit" class="button-submit">Login</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    errorLogin (state) {
      return this.$store.getters.errorLogin
    }
  },
  methods: {
    userLogin () {
      this.$store.dispatch('userLogin', {
        username: this.username,
        password: this.password
      })
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.button-submit {
  background-color: #fc7753;
  border: none;
  margin-top: 2%;
}

.login {
  margin-top: 5%;
}

.error-login {
  text-align: center
}

.error-login p {
  font-size: 14px;
  color: red;
  font-weight: 400%;
}
</style>
