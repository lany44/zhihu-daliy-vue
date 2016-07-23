<!--列表页-->
<template>
  <div class="main-list" id="foo">
    <list-header :show-sidebar.sync="showSidebar" :title="title" :tip="tip" :icon-display="iconDisplay"> </list-header>
    <side-bar :show-sidebar.sync="showSidebar"> </side-bar>
    
    <router-view></router-view>
    
    <div v-if="showSidebar" class="mask" @click="hideBar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import sideBar from '../components/sidebar.vue'
import listHeader from '../components/list-header.vue'
import { showBarAPI, hideBarAPI } from "../util.js"

export default {
  components: { sideBar, listHeader },
  data() {
    return {
      loading: false,
      showSidebar: false,
      tip: ''
    }
  },
  computed: {
    title() {
      switch(this.$route.params.id) {
        case '13':
          return '日常心理学'
        case '12':
          return '用户推荐日报'
        case '3':
          return '电影日报'
        case '11':
          return '不许无聊'
        case '4':
          return '设计日报'
        case '5':
          return '大公司日报'
        case '6':
          return '财经日报'
        case '10':
          return '互联网安全'
        case '2':
          return '开始游戏'
        case '7':
          return '音乐日报'
        case '9':
          return '动漫日报'
        case '8':
          return '体育日报'
        default:
          return '首页'
      }
    },
    iconDisplay() {
      if (this.$route.params.id) { 
        return false
      } else { 
        return true 
      }
    }
  },
  events: {
    'changeTile' (str) {
      this.tip = str
    }
  },
  attached() {

  },
  methods: {
    showBar() {
      showBarAPI()
      this.showSidebar = !this.showSidebar
    },
    hideBar() {
      hideBarAPI()
      this.showSidebar = !this.showSidebar
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/swiper-3.3.1.min.css";
  @import "../assets/css/variable.scss";
  @import "../assets/css/reset";

  .mask{
    position: fixed;
    transform: translateZ(0);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: rgba(0, 0, 0, 0.6);
  }

  html, body {
    height: 100%;
  }
</style>
