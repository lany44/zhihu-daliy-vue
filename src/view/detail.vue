<template>

  <detail-header :show-share.sync="showShare" :comments="extra.comments" :zan="extra.popularity"></detail-header>

  <div id="detailImg" :style="{backgroundImage: 'url('+ replaceUrl(image) +')'}">
    <h2>{{title}}</h2>
  </div>

  <div v-if="recommenders.length>0" id="recommendersBox">
    <span>推荐者</span>
    <div class="recommenders" v-for="item in recommenders">
      <img :src="item.avatar | replaceImgUrlAPI" v-link="{ path:'/recommenders'}">
    </div>
  </div>

  <detail-content v-if="body" :content="body"></detail-content>

  <div v-if="section.name" id="sectionBox" v-link="{path: '/section'}">
    <div class="section-btn">
      <img :src="thumbnail | replaceImgUrlAPI">
      <p>本文来自：{{section.name}} · 合集 </p>
      <div class="arrow"></div>
    </div>
  </div>

  <div v-show="showShare" class="mask" id="showShare" @click="hideShare">
    <div class="shareBox">
      <h2>分享</h2>
      <ul>
        <li><i>&#xe624</i><span>新浪微博</span></li>
        <li><i>&#xe625</i><span>推特</span></li>
        <li><i>&#xe622</i><span>微信朋友圈</span></li>
        <li><i>&#xe621</i><span>QQ空间</span></li>
        <li><i>&#xe626</i><span>微信</span></li>
        <li><i>&#xe623</i><span>QQ</span></li>
        <li><i>&#xe620</i><span>豆瓣</span></li>
      </ul>
    </div>
  </div>

  <div></div>

</template>

<script type="text/ecmascript-6">
  import { replaceImgUrlAPI } from "../util.js"
  import detailContent from '../components/detail-content.vue'
  import detailHeader from '../components/detail-header.vue'

  export default {
    components: {
      detailHeader,
      detailContent
    },
    data() {
      return {
        body: '',
        title: '',
        image: '',
        shareUrl: '',
        recommenders: [],
        section: {},
        thumbnail: '',
        extra: {},
        showShare: false,
      }
    },
    ready() {
    },
    route: {
      activate(transition) {
        let _this = this
        if(transition.from.path === '/') {
          window.sessionStorage.sectionScrollTop = 0
          window.sessionStorage.ifSectionReq = true
        }else {
          window.sessionStorage.ifSectionReq = false
        }
        _this.getDetail()
        _this.getExtra()
        _this.$nextTick(() => window.document.body.scrollTop = 0)
        transition.next()
      },
      deactivate(transition) {
        let _this = this
        window.sessionStorage.detailId = _this.$route.params.id
        window.sessionStorage.extra = JSON.stringify(_this.extra)
        window.sessionStorage.sectionId = JSON.stringify(_this.section.id)
        _this.init()
        transition.next()
      }
    },
    methods: {
      replaceUrl(url) {
        const newUrl = replaceImgUrlAPI(url)
        return newUrl
      },
      getDetail() {
        let _this = this
        _this.loading = true
        //http://news-at.zhihu.com/api/4/news/3892357
        fetch('http://news-at.zhihu.com/api/4/news/' + _this.$route.params.id)
          .then(res => res.json())
          .then(json => {
            _this.$set('body', json.body)
            _this.$set('title', json.title)
            _this.$set('image', json.image)
            _this.$set('shareUrl', json.share_url)
            if(json.recommenders) {
              _this.$set('recommenders', json.recommenders)
            }
            if(json.section) {
              _this.$set('section', json.section)
              _this.$set('thumbnail', json.section.thumbnail)
            }
            if(!json.body) {
              _this.$set('body', json.shareUrl)
            }
          })
        _this.loading = false
      },
      getExtra() {

        let _this = this
        _this.loading = true
        //http://news-at.zhihu.com/api/4/story-extra/#{id}
        fetch('http://news-at.zhihu.com/api/4/story-extra/' + _this.$route.params.id)
          .then(res => res.json())
          .then(json => _this.$set('extra', json))
        _this.loading = false
      },
      init() {
        let _this = this
        _this.body= '',
        _this.title= '',
        _this.image= '',
        _this.shareUrl= '',
        _this.recommenders= [],
        _this.section= {},
        _this.thumbnail= '',
        _this.extra= {}
      },
      hideShare() {
        window.document.body.style.overflow = 'initial'
        this.showShare = false
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";

  #detailImg {
    width: 100%;
    height: size(605);
    margin-top: size(150);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    h2 {
      position: absolute;
      bottom: size(50);
      left: size(30);
      font-size: 20px;
      color: $white;
    }
  }

  #recommendersBox {
    display: flex;
    align-items: center;
    padding: size(20);
    background-color: $bg-gray;
    span {
      margin-left: size(20);
      font-size: 12px;
    }
    img {
      width: size(90);
      border-radius: 50%;
      margin-left: size(20);
    }
  }

  #sectionBox {
    margin: size(50);
    margin-top: 0;
    .section-btn {
      position: relative;
      display: flex;
      align-items: center;
      background-color: $bg-gray;
      img {
        height: size(140);
        margin-right: size(20);
      }
      p {
        font-size: 13px;
      }
      .arrow {
        display: block;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 20px;
        right: 15px;
        border: solid #867e7a;
        border-width: 1px 1px 0 0;
        transform: rotate(45deg);
      }
    }
  }

  #showShare {
    .shareBox {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      background-color: $white;
      width: 90%;
      height: 50%;
      h2 {
        position: absolute;
        top: size(40);
        left: size(60);
        font-size: 15px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        margin: size(100);
        li {
          height: size(250);
          width: size(250);
          display: inline-block;
          text-align: center;
          i {
            font-size: 30px;
            padding: size(20);
            line-height: size(200);
            font-family: "iconfont";
            font-style: normal;
            color: $white;
            border-radius: 50%;
          }
          span {
            display: block;
          }
        }
        li:nth-child(1) {
          i { background-color: #ED4061; }
        }
        li:nth-child(2) {
          i { background-color: #2EA2EB; }
        }
        li:nth-child(3) {
          i { background-color: #2269C5; }
        }
        li:nth-child(4) {
          i { background-color: #5FC74A; }
        }
        li:nth-child(5) {
          i { background-color: #71CE25; }
        }
        li:nth-child(6) {
          i { background-color: #228A31; }
        }
        li:nth-child(7) {
          i { background-color: #FFCE00; }
        }
      }
    }
  }
</style>
