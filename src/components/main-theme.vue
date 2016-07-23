<template>
  <div class="main-theme-img">
    <img :src="background | replaceImgUrlAPI" alt="哎呀呀">
    <h2>{{description}}</h2>
  </div>
  <ul class="theme-list">
    <li class="theme-editor" v-link="{path: '/editors'}" v-if="editors.length>0">
      <span>主编</span><img :src="item.avatar | replaceImgUrlAPI" v-for="item in editors">
    </li>
    <list-comp v-for="item in allStories" :item="item"></list-comp>
  </ul>
</template>

<script>
  import listComp from '../components/list-comp.vue'
  import { replaceImgUrlAPI } from '../util.js'

  export default {
    components: {
      listComp,
    },
    data() {
      return {
        allStories: [],
        description: '',
        background: '',
        name: '',
        editors: [],
        id: ''
      }
    },
    ready() {
      this.getTheme()
    },
    route: {
      data(transition) {
        var _this = this
        //判断从哪里来，如果从详情页面来救不重新请求，且回到上次列表位置
        if(transition.from.name === 'detail') {
          _this.$nextTick(function() {
            window.document.body.scrollTop = window.sessionStorage.scrollTop
          })
        }else {
          _this.getTheme()
          window.document.body.scrollTop = 0
        }
        window.addEventListener('scroll', _this.getScrollTheme, false)
        transition.next()
      },
      deactivate(transition) {
        var _this = this
        window.removeEventListener('scroll', _this.getScrollTheme, false)
        window.sessionStorage.scrollTop = window.document.body
        window.sessionStorage.editors = JSON.stringify(_this.editors)
        transition.next()
      }
    },
    methods: {
      replaceUrl(url) {
        const newUrl = replaceImgUrlAPI(url)
        return newUrl
      },
      getTheme() {
        let _this = this
        _this.loading = true
        //URL: http://news-at.zhihu.com/api/4/theme/11
        fetch('http://news-at.zhihu.com/api/4/theme/'+ _this.$route.params.id)
          .then(res => res.json())
          .then(json => {
            _this.$set('allStories', json.stories)
            _this.$set('description', json.description)
            _this.$set('background', json.background)
            _this.$set('name', json.name)
            _this.$set('editors', json.editors)
            _this.$set('id', _this.allStories[_this.allStories.length - 1].id)
            _this.loading = false
          })
      },
      getScrollBefore() {
        let _this = this
        _this.loading = true
        fetch('http://news-at.zhihu.com/api/4/theme/'+ _this.$route.params.id + '/before/' + _this.id)
          .then(res => res.json())
          .then(json => {
            _this.$set('allStories', _this.allStories.concat(json.stories))
            _this.$set('id', _this.allStories[_this.allStories.length - 1].id)
            _this.loading = false
          })
      },
      getScrollTheme() {
        var _this = this
        if((window.document.body.offsetHeight + window.document.body.scrollTop) + 100 > window.document.body.scrollHeight && !_this.loading) {
          _this.getScrollBefore()
        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";


  .main-theme-img{
    margin-top: size(150);
    height: size(675);
    position: relative;
    box-shadow: 0 0 100px rgb(100,100,100) inset;
    overflow: hidden;
    >img {
      animation: move 20s linear infinite alternate;
      @keyframes move {
        0% {
          transform: scale(1, 1)  translate(-10px, -10px)
        },
        85% {
          transform: scale(1.2, 1.2)  translate(10px, 10px)
        }
      }
    }
    h2 {
      position: absolute;
      bottom: size(80);
      left: size(30);
      font-size: 18px;
      color: $white;
    }
  }

  .theme-list {
    padding: 0 size(20);
    li.theme-editor {
      margin: size(20);
      height: size(110);
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: rgb(150,150,150);
      }
      img {
        margin-left: size(40);
        height: size(85);
        width: size(85);
        border-radius: 50%;
      }
    }
  }
</style>
