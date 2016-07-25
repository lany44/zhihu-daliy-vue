<template>
  <div id="sidebarBox" :class="{'show-sidebar':showSidebar}">
    <div class="swiper-slide">
      <div class="sidebar-user">
        <div>
          <img src="../assets/logo.png" alt="头像" v-link="{path:'/lany44'}">
          <span>lany44</span>
        </div>
        <a>
          <i class="iconfont">&#xe614</i>
          <span>我的收藏</span>
        </a>
        <a>
          <i class="iconfont">&#xe60f</i>
          <span>离线下载</span>
        <a>
      </div>
      <ul class="sidebar-list">
        <li v-link="{path: '/'}" @click="hideBar"><i class="iconfont">&#xe61b</i>首页</li>
        <li v-for="item in list" @click="hideBar" v-link="{name: 'theme', params: { id: item.id }}">
          {{item.name}}
          <span>+</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { hideBarAPI } from '../util.js'

export default{
  props: ['showSidebar'],
  data() {
    return {
      list: []
    }
  },
  ready () {
    this.getList()
  },
  attached() {

  },
  methods: {
    getList() {
      let _this = this
      fetch('http://news-at.zhihu.com/api/4/themes')
        .then(res => res.json())
        .then(json => {_this.list = json.others})
    },
    hideBar() {
      hideBarAPI()
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";

  .iconfont {
    font-family:"iconfont";
    font-size: 14px;
    font-style: normal;
    color: $white;
  }

  .show-sidebar {
    transform: translateZ(0);
    box-shadow: 0 0 50px rgb(50,50,50);
    transform: translateX(size(910));
  }

  #sidebarBox {
    overflow: auto;
    position: fixed;
    display: block;
    height: 100%;
    width: size(910);
    top: 0;
    left: size(-910);
    z-index: 100;
    transition: all .3s ease;
  }
  .swiper-slide {
    height: 100%;
  }
  .sidebar-user {
    padding: size(50) 0 0 size(50);
    background-color: $main-blue;
    font-size: 18px;
    >div {
      display: flex;
      align-items: center;
      color: white;
      img {
        width: size(100);
        height: size(100);
        border-radius: 50%;
        background: white;
        margin-right: size(50);
      }
    }
    a {
      margin: size(100) 0 size(50) 0;
      display: inline-block;
      i {
        margin-left: size(20);
        position: relative;
        top: -2px;
      }
      span {
        font-size: 16px;
        color: white;
        font-weight: bold;
        margin: 0 size(100)  0 size(50);
      }
    }
  }

  ul.sidebar-list {
    background-color: $white;
    li {
      padding-left: size(50);
      color: $black;
      height: size(150);
      line-height: size(150);
      font-size: 18px;
      span {
        display: inline-block;
        float: right;
        margin-right: size(150);
        font-size: 25px;
        color: $gray;
      }
    }
    li:first-child {
      background-color: $gray;
      color: $main-blue;
      i {
        margin: 0 size(50) 0 size(15);
        font-size: 20px;
        color: $main-blue;
      }
    }
  }
</style>
