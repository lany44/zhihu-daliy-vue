<template>
  <div class="">
    <li class="list-box i-{{* item.id}}" v-link="{name: 'detail', params: {id : id}}" v-cloak>
      <p>{{item.title}}</p>
      <div class="list-img" v-if="item.images">
        <img :src="item.images[0] | replaceImgUrlAPI" alt="图片"/>
        <i v-if="item.multipic" class="iconfont">&#xe61c</i>
      </div>
    </li>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        id : this.item.id
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";
  .iconfont {
    font-family:"iconfont";
    font-size:19px;
    font-style:normal;
    color: $bg-gray;
  }

  .list-box {
    display: flex;
    justify-content: space-between;
    min-height: size(220);
    box-sizing: border-box;
    margin: size(20) 0;
    padding: size(35) size(45);
    border: 1px solid $gray;
    box-shadow: 0px 1px 1px $gray;
    border-radius: 5px;
    background: $white;
    .list-img {
      position: relative;
      height: size(210);
      width: size(230);
      img {
        width: 100%;
        height: 100%;
      }
      i {
        position: absolute;
        bottom: size(0);
        right: size(10);
      }
    }
    p {
      flex: 1;
      font-size: 16px;
    }
  }
</style>
