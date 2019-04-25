<template>
  <div class="home">
    <MainHeader></MainHeader>
    <MainSlider></MainSlider>
    <MainIntroduce></MainIntroduce>
    <HomeProductGrid></HomeProductGrid>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
import MainHeader from '@/views/Header.vue'
import MainSlider from '@/components/MainSlider.vue'
import MainIntroduce from '@/components/MainIntroduce.vue'
import HomeProductGrid from '@/components/HomeProduct.vue'
import MainFooter from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    MainHeader,
    MainSlider,
    MainIntroduce,
    HomeProductGrid,
    MainFooter
  }
}
</script>
