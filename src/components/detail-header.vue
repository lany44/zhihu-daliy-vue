<template>
<!--detail－header-->
  <div id="detailHeader">
    <ul>
      <li class="goback" @click="goBack"><i class="iconfont">&#xe603</i></li>
      <li class="share" @click="goShare"><i class="iconfont">&#xe61f</i></li>
      <li class="star"><i class="iconfont">&#xe604</i></li>
      <li class="comments" v-link="{ path: '/comments'}"><i class="iconfont">&#xe606</i><span>{{comments}}</span></li>
      <li class="zan"><i class="iconfont">&#xe611</i><span>{{zan}}</span></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:[ 'showShare', 'comments', 'zan' ],
    data() {
      return {
        star: false,
      }
    },
    methods: {
      goBack() {
        window.history.back()
      },
      goShare() {
        document.body.style.overflow = 'hidden'
        this.showShare = true
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";
  
  .iconfont {
    font-family: "iconfont";
    color: $white;
  }

  .hideHeader {
    display: none;
  }

  #detailHeader {
    display: flex;
    z-index: 4;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: $main-blue;
    height: size(150);
    width: 100%;
    ul {
      li.goback {
        position: absolute;
        top: size(30);
        left: size(50);
      }
      li.star, li.zan{
        margin: 0 size(50);
      }
      li.zan{
        position: relative;
        top: size(-5);
        >span {
          position: relative;
          bottom: size(5);
        }
      }
      li{
        display: inline-block;
        span {
          position: relative;
          left: size(20);
          bottom: size(10);
          color: $white;
        }
      }
    }
  }
</style>
