<template>
  <div class="position-fixed nav-side-menu">
    <ul>
      <!-- Sidebar - Brand -->
      <router-link to="/">
        <a class="dashboard-title d-flex align-items-center justify-content-center">
          <div class="sidebar-brand-text mx-3">My Perfume</div>
        </a>
      </router-link>
      
      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'admin'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'admin'">
        <a class="nav-link" href="#">
          <i class="fas fa-blog"></i>
          <span>All Post</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'admin'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'admin'">
        <a class="nav-link" href="#">
          <i class="far fa-plus-square"></i>
          <span>Add New Post</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'admin'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'admin'">
        <a class="nav-link" href="#">
          <i class="fas fa-shopping-cart"></i>
          <span>Orders</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'admin'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'admin'">
        <router-link to="/dashboard/catalogue">
          <a class="nav-link" href="#">
            <i class="fas fa-box-open"></i>
            <span>Catalogue</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'admin'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'admin'">
        <router-link to="/dashboard/add-products">
          <a class="nav-link" href="#">
            <i class="fas fa-truck-loading"></i>
            <span>New Product</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'admin'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'admin'">
        <router-link to="/dashboard/add-brand">
          <a class="nav-link" href="#">
            <i class="far fa-copyright"></i>
            <span>New Brand</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'member'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'member'">
        <a class="nav-link" href="#">
          <i class="far fa-id-card"></i>
          <span>Profile</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'member'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'member'">
        <router-link to="/dashboard/add-address">
          <a class="nav-link" href="#">
            <i class="fas fa-location-arrow"></i>
            <span>Add Address</span></a>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" v-if="role == 'member'">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active" v-if="role == 'member'">
        <router-link to="/dashboard/purchase-history">
          <a class="nav-link" href="#">
            <i class="fas fa-history"></i>
            <span>History</span></a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'DashboardSidebar',
  data() {
    return {

    }
  },
  computed: {
    role(state) {
      return this.$store.getters.role
    },
    
  },
  methods: {
    test() {
      console.log('masuk')
      router.push('/dashboard/add-products')
    }
  }
}
</script>

<style scoped>
.nav-side-menu ul {
  list-style: none;
  padding: 0;
}

.nav-side-menu a {
  color: white;
  font-weight: 300;
  text-decoration: none;
}

.nav-item a {
  color: white;
  font-weight: 300;
  font-size: 15px;
}

.dashboard-title {
  height: 160px;
}

.nav-link i {
  margin-right: 5%;
}

.nav-link {
  margin: 0;
  padding: 0;
  width: 150px;
  text-align: left;
  margin-left: 10%;
}

.sidebar-divider {
  margin-bottom: 15%;
  margin-top: 15%;
}

</style>
