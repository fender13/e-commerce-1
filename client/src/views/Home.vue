<template>
  <div class="home">
    <MainHeader></MainHeader>
    <MainSlider></MainSlider>
    <MainIntroduce></MainIntroduce>
    <HomeProductGrid></HomeProductGrid>
  </div>
</template>

<script>
import MainHeader from '@/views/Header.vue'
import MainSlider from '@/components/MainSlider.vue'
import MainIntroduce from '@/components/MainIntroduce.vue'
import HomeProductGrid from '@/components/HomeProduct.vue'

export default {
  name: 'home',
  components: {
    MainHeader,
    MainSlider,
    MainIntroduce,
    HomeProductGrid
  }
}
</script>
