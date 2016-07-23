<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="item in top_stories" class="swiper-slide" :style="{ backgroundImage: 'url('+replaceStr(item.image)+')'}" v-link="{name: 'detail', params: {id: item.id}}">
        <div class="swiper-mask"></div>
        <h1 class="slider-title">{{item.title}}</h1>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { replaceImgUrlAPI } from '../util.js'

export default {
  props: ['top_stories'],
  ready() {
    var mySwiper = new window.Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        observer: true,
        lazyLoading: true,
        resistanceRatio: 0
      })
  },
  methods: {
    replaceStr(str) {
      const newStr = replaceImgUrlAPI(str)
      return newStr
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/swiper-3.3.1.min.css";
  @import "../assets/css/variable.scss";

  .swiper-container {
    position: relative;
  }

  .swiper-wrapper {
    height: size(675);
  }

  .swiper-slide {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    box-shadow: 0 0 200px rgb(50,50,50) inset;
    h1 {
      position: absolute;
      bottom: size(70); 
      width: 100%;
      font-size: 20px;
      color: $white;
      padding-left: size(50);
    }
  }
  
  .swiper-pagination {
    z-index: 3;
  }

  .swiper-pagination-bullet {
    width: size(18);
    height: size(18);
    display: inline-block;
    border-radius: 50%;
    background: #5a5a5a;
    opacity: .8;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #f4f4f4;
  }

  .swiper-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: $black;
    opacity: .1;
    filter: blur(5px);
  }

</style>






