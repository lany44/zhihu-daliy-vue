<template>
  <div class="recommenders-header">
    <i @click="goback">&#xe603</i>
    <span>推荐者</span>
  </div>

  <div class="recommenders-box">
    <p>本文推荐者</p>
    <ul>
      <li v-for="item in recommenders" class="recommender s-{{* item.id}}">
       <a :href="'http://www.zhihu.com/people' +item.zhihu_url_token"><img :src="item.avatar | replaceImgUrlAPI" alt="头像"></a> 
        <div class="recommender-info">
          <p>{{item.name}}</p>
          <p>{{item.bio}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        recommenders: [],
        editors: []
      }
    },
    route: {
      activate(transition) {
        let _this = this  
        _this.getRecommenders()
        _this.$nextTick(() => {
          window.document.body.scrollTop = 0
        })
        transition.next()
      },
      deactivate(transition) {
        let _this = this;
        _this.recommenders = []
        transition.next()
      }
    },
    methods: {
      goback() {
        window.history.back()
      },
      //http://news-at.zhihu.com/api/4/story/#{id}/recommenders
      getRecommenders() {
        let _this = this
        const id = window.sessionStorage.detailId
        fetch('http://news-at.zhihu.com/api/4/story/'+ id +'/recommenders')
          .then(res => res.json())
          .then(json => {
            _this.$set('recommenders', json.items[0].recommenders)
          })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";

  .recommenders-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 4;
    height: size(150);
    line-height: size(150);
    background-color: $main-blue;
    padding-left: size(50);
    color: $white;
    font-size: 16px;
    i {
      font-family: "iconfont";
      font-style: normal;
      margin-right: size(50);
    }
  }

  .recommenders-box {
    margin-top: size(150);
    padding: 0 size(50);
    font-size: 14px;
    >p {
      height: size(150);
      line-height: size(150);
    }
    ul li {
      display: flex;
      align-items: center;
      border-top: 1px solid $gray;
      height: size(180);
      a img {
        border-radius: 50%;
      }
      .recommender-info {
        margin-left: size(30);
        p:first-child {
          font-weight: bold;
        }
        p:last-child {
          color: rgb(130,130,130);
        }
      }
    }
  }
</style>




