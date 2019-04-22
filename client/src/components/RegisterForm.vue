<template>
  <div>
    <h2 class="register-form">
      <img src="../assets/icon/register.png" alt>Register
    </h2>
    <div class="form-container register">
      <b-form v-on:submit.prevent="userRegister">
        <b-row class="mb-3">
          <b-col>
            <label for="fistName">First Name:</label>
            <b-form-input
              id="firstName"
              v-model="firstName"
              type="text"
              placeholder="Enter your first name"
            />
            <div class="register-error">
              <p>{{ errorFirstName }}</p>
            </div>
            <div></div>
          </b-col>
          <b-col>
            <label for="lastName">Last Name:</label>
            <b-form-input
              id="lastName"
              v-model="lastName"
              type="text"
              placeholder="Enter your last name"
            />
            <div class="register-error">
              <p>{{ errorLastName }}</p>
            </div>
            <div></div>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <label for="email">Email:</label>
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
            />
            <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <div class="register-error">
              <p>{{ errorEmail }}</p>
            </div>
            <div></div>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <label for="username">Username:</label>
            <b-form-input
              id="username"
              v-model="username"
              type="text"
              placeholder="Enter your username"
            />
            <div class="register-error">
              <p>{{ errorUsername }}</p>
            </div>
            <div></div>
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
            <small id="passwordHelpInline" class="text-muted">
            Must be 8-20 characters long.
            </small>
            <div class="register-error">
              <p>{{ errorPassword }}</p>
            </div>
            <div></div>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <b-button type="submit" class="button-submit">Register</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: "RegisterForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    };
  },
  computed: {
    errorFirstName(state) {
      return this.$store.getters.errorFirstName
    },
    errorLastName(state) {
      return this.$store.getters.errorLastName
    },
    errorEmail(state) {
      return this.$store.getters.errorEmail
    },
    errorUsername(state) {
      return this.$store.getters.errorUsername
    },
    errorPassword(state) {
      return this.$store.getters.errorPassword
    }
  },
  methods: {
    userRegister() {
      console.log('masuk')
      this.$store.dispatch('userRegistration', {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password
      })
      this.firstName = ''
      this.lastName = ''
      this.username = ''
      this.email = ''
      this.password = ''
    },
  }
};
</script>

<style scoped>
.button-submit {
  background-color: #fc7753;
  border: none;
  margin-top: 2%;
}

.register {
  margin-top: 5%;
}

.register-error p {
  font-size: 14px;
  color: red;
  font-weight: 400%;
}
</style>
