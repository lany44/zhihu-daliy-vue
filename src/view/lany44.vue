<template>
  <div id="author">
    <i class="go-back" @click="goBack">&#xe603</i>
    <img src="../assets/lany44.jpg"alt="头像" class="author-img">
    <p class="author-name">lany44</p>
    <p class="more-info">
      <a href="http://github.com/lany44" target="_blank"><i>&#xe66c</i></a>
      <a href="http://weibo.com/lany44" target="_blank"><i>&#xf0085</i></a>
      <a href="http://lany44.github.io" target="_blank"><i>&#xe604</i></a>
    </p>
    <p>软件工程在读，即将大四</p>
    <p>寻找前端实习机会...</p>
    <p>项目总结ing</p>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack() {
        window.history.back()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";

  @font-face {font-family: 'iconfont-x';
    src: url('../assets/iconfont.eot'); /* IE9*/
    src: url('../assets/iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../assets/iconfont.woff') format('woff'), /* chrome、firefox */
    url('../assets/iconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('../assets/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  #author {
    text-align: center;
    position: relative;
    i {
      font-family: "iconfont";
      font-style: normal;
      font-size: 25px;
    }
    img {
      border-radius: 50%;
    }
    .go-back {
      position: absolute;
      top: size(50);
      left: size(50);
      color: $main-blue;
    }
    .author-img {
      margin-top: size(300);
      width: size(400);
    }
    .author-name {
      margin: size(100) 0;
      font-size: 23px;
      font-weight: bold;
    }
    .more-info {
      i {
        font-family: 'iconfont-x';
        margin: size(20);
        padding: size(10);
        font-size: 33px;
      }
      a:nth-child(1) i {
        color: black;
      }
      a:nth-child(2) i {
        color: rgb(232, 48, 69);
      }
      a:nth-child(3) i {
        color: rgb(93,172,129);
        position: relative;
        top: size(10);
        font-size: 38px;
      }
    }
    p {
      margin: size(60);
      font-size: 16px;
    }
    p:last-child {
      margin-top: size(100);
      font-weight: bold;
      font-size: 18px;
    }
  }
</style>
