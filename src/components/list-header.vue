<template>
  <div id="listHeader">
    <div class="header-icon" @click="showBar"><i class="iconfont">&#xe612</i></div>
    <div v-if="!tip" class="header-cont"><p>{{title}}</p></div>
    <div v-if="tip" class="header-cont"><p>{{tip | dateTimeAPI}}</p></div>
    <div class="header-icon" v-show="iconDisplay" ><i class="iconfont">&#xe610</i></div>
    <div class="header-icon" v-show="iconDisplay" @click="changeMode"><i class="iconfont">&#xe619</i></div>
  </div>
</template>

<script>
import { showBarAPI } from '../util.js'

export default{
  props: ['showSidebar', 'title', 'iconDisplay', 'tip'],
  data() {
    return {
      nightStyle: false
    }
  },
  methods: {
    showBar() {
      showBarAPI()
      this.showSidebar = !this.showSidebar
    },
    changeMode() {
      if (!this.nightStyle) {
        window.document.getElementById('app').className = 'night-style'
      } else {
        window.document.getElementById('app').className = ''
      }
      this.nightStyle = !this.nightStyle
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";

  .iconfont {
    font-family:"iconfont";
    font-size:19px;
    font-style:normal;
    color: $white;
  }

  #listHeader{
    box-shadow: 0 0 10px rgb(50,50,50);
    position: fixed;
    transform: translateZ(0);//开启硬件加速！
    top: 0;
    z-index: 4;
    height: size(150);
    width: 100%;
    background: $main-blue;
    display: flex;
    align-items: center;
    .header-icon{
      padding-left: size(50);
      flex:1;
    }
    .header-cont {
      flex: 6;
      >p{
        color: $white;
        font-size: 16px;
      }
    }
  }
</style>
