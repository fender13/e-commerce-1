<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://i.imgur.com/YHCSy1P.jpg"></b-carousel-slide>

      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://i.imgur.com/jB3AbCK.jpg"></b-carousel-slide>

      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://i.imgur.com/QE8H4F1.jpg"></b-carousel-slide>

      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://i.imgur.com/WNO08vS.jpg"></b-carousel-slide>

      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://i.imgur.com/YqQXaR1.jpg"></b-carousel-slide>

    </b-carousel>

  </div>
</template>

<script>
export default {
  name: 'MainSlider',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style scoped>

</style>
