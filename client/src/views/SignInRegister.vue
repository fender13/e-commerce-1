<template>
  <div>
    <MainHeader></MainHeader>
    <div class="member-container">
      <div class="member-area">
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <div>
                <div class="page-title">
                  <h2>Sign In - Register</h2>
                </div>
                <div>
                  <p style="text-align: center;">Registering for this site allows you to access your order status and history. Just fill in the register fields, and we’ll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.</p>
                </div>
                <div class="logreb-button" v-if="!loginOptions">
                  <b-button class="button-submit" v-on:click.prevent="changeOptions">Login</b-button>
                </div>
                <div class="logreb-button" v-else>
                  <b-button class="button-submit" v-on:click.prevent="changeOptions">Register</b-button>
                </div>
              </div>
            </b-col>
            <b-col class="bv-example-row mycontent-left">
              <LoginForm
                v-if="loginOptions"
                >
              </LoginForm>
              <RegisterForm
                v-if="!loginOptions"
                >
              </RegisterForm>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>

</template>

<script>
import MainHeader from '@/views/Header.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'SignInRegister',
  components: {
    MainHeader,
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      loginOptions: true
    }
  },
  methods: {
    changeOptions () {
      if (this.loginOptions == true) {
        this.loginOptions = false
      } else {
        this.loginOptions = true
      }
    }
  }
}
</script>

<style scoped>
.member-container {
  margin-top: 4%;
  height: 100vh;
}

.button-submit {
  background-color: #fc7753;
  border: none;
  margin-top: 2%;
}

.page-title {
  text-align: center;
}

.logreb-button {
  text-align: center;
}
</style>
