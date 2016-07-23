<template lang="html">
  <div class="section-header">
    <i @click="goBack">&#xe603</i>
    <span>{{name}}</span>
  </div>
  <ul class="sction-items-box">
    <li v-for="item in stories" class="item s-{{* item.id}}">
      <div class="item-info">
        <p>{{item.title}}</p>
        <p>{{item.display_date}}</p>
      </div>
      <div class="item-images">
        <img :src="item.images[0] | replaceImgUrlAPI"/>
        <i v-if="item.images.length > 1">&#xe61c</i>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      timestamp: '',
      stories: [],
      name: '',
      loading: true,
    }
  },
  route: {
    activate(transition) {
      var _this = this
      if(window.sessionStorage.ifSectionReq === 'true')
        _this.getSectionlatest()
      _this.$nextTick(() => {
        window.document.body.scrollTop = window.sessionStorage.sectionScrollTop
      })
      window.addEventListener('scroll', _this.goScroll, false)
      transition.next()
    },
    deactivate(transition) {
      var _this = this
      window.removeEventListener('scroll', _this.goScroll, false)
      transition.next()
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    goScroll() {
      var _this = this
      if((window.document.body.offsetHeight + window.document.body.scrollTop) + 100 > window.document.body.scrollHeight && !_this.loading)
        _this.getSectionBefore()
    },
    //http://news-at.zhihu.com/api/3/section/1
    getSectionlatest() {
      let _this = this
      _this.loading = true
      const sectionId = window.sessionStorage.sectionId
      fetch('http://news-at.zhihu.com/api/3/section/' + sectionId)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          _this.$set('timestamp', json.timestamp)
          _this.$set('stories', json.stories)
          _this.$set('name', json.name)
          _this.loading = false
        })
    },
    //http://news-at.zhihu.com/api/3/section/1/before/1398780001
    getSectionBefore() {
      let _this = this
      _this.loading = true
      const timestamp = _this.timestamp
      const sectionId = window.sessionStorage.sectionId
      fetch('http://news-at.zhihu.com/api/3/section/'+ sectionId +'/before/' + timestamp)
        .then(res => res.json())
        .then(json => {
          _this.$set('timestamp', json.timestamp)
          _this.$set('stories', _this.stories.concat(json.stories))
          _this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/css/variable.scss";

  i {
    font-family: "iconfont";
    font-style: normal;
  }

  .section-header {
    height: size(150);
    line-height: size(150);
    width: 100%;
    background-color: $main-blue;
    color: $white;
    font-size: 18px;
    position: fixed;
    top: 0;
    z-index: 4;
    i {
      padding: size(50);
    }
  }

  .sction-items-box {
    margin-top: size(150);
    padding-top: size(25);
    background-color: $bg-gray;
    li {
      background-color: $white;
      margin: size(25);
      padding: size(35) size(45);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid $gray;
      border-radius: 5px;
      box-shadow: 0 5px 5px $bg-gray;
      .item-info {
        height: size(210);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 15px;
        p:last-child {
          color: rgb(150,150,150);
          font-size: 12px;
        }
      }
      .item-images {
        position: relative;
        img {
          height: size(210);
          width: size(230);
        }
        i {
          position: absolute;
          color: $gray;
        }
      }
    }
  }
</style>
