<template>
    <div class="main-topbar">
      <div class="topbar-container">
        <div class="slogan">
          <h5>Always deliver more than expected</h5>
        </div>
        <div class="topbar-menu">
          <div class="my-account" v-if="isLogin">
            <router-link to="/dashboard">My Account</router-link>
            <a href="#" style="color: white" v-on:click.prevent="logout">Logout</a>
          </div>
          <div class="sign-in" v-else>
            <router-link to="/member-area">Sign In</router-link>
          </div>
          <ul class="socmed-menu">
            <li><a href="#"><i class="fab fa-facebook-f" style="color: white"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter" style="color: white"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram" style="color: white"></i></a></li>
            <li><a href="#"><i class="fab fa-pinterest" style="color: white"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MainTopbar',
  computed: {
    isLogin (state) {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>

<style scoped>
.main-topbar {
  width: 100%;
  height: 45px;
  background-color: #fc7753;
}

.topbar-container {
  margin-left: 2%;
  margin-right: 2%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.slogan {
  height: 100%;
  margin: 0%;
  display: flex;
  align-items: center;
}

.slogan h5 {
  font-size: 15px;
  color: white;
  margin: 0;
}

.topbar-container li {
  display: inline;
}

.topbar-menu {
  display: flex;
  justify-content: space-between;
}

.my-account {
  width: 170px;
  display: flex;
  justify-content: space-between;
}

.my-account a {
  font-size: 15px;
  color: white;
  margin: 0;
  text-decoration: none;
}

.socmed-menu {
  width: 150px;
  text-align: right;
  margin: 0;
}

.socmed-menu li i {
  margin-left: 11%;
}

.separator {
  color: white;
}

.sign-in a {
  font-size: 15px;
  color: white;
  margin: 0;
  text-decoration: none;
}
</style>
