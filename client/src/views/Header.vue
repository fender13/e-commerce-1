<template>
  <div>
    <MainTopbar></MainTopbar>
    <MainMenu></MainMenu>
  </div>
</template>

<script>
import MainTopbar from '@/components/Topbar.vue'
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'MainHeader',
  components: {
    MainTopbar,
    MainMenu
  }
}
</script>

<style scoped>

</style>
