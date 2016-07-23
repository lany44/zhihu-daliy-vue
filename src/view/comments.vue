<template>
  <div class="comments">
    <div id="comments-header">
      <i @click="goBack">&#xe603</i>
      <h2>{{extra.comments}} 条点评</h2>
      <i>&#xe627</i>
    </div>

    <div id="comments-lang" >
      <ul class="comments-lang-box" v-if="extra.long_comments > 0">
        <p class="comments-count"><span>{{extra.long_comments}}</span> 条长评论</p>
        <comments-comp v-for="item in lang_comments" :comment="item"></comments-comp>
      </ul>
      <div v-if="extra.long_comments == 0" class="no-lang-comments">
        <i>&#xe62a</i>
        <p>深度长评虚位以待</p>
      </div>
    </div>

    <div id="comments-short">
      <ul class="comments-short-box" v-if="extra.short_comments > 0">
        <p class="comments-count"><span>{{extra.short_comments}}</span> 条短评论</p>
        <comments-comp v-for="item in short_comments" :comment="item"></comments-comp>
      </ul> 
    </div>

  </div>
</template>

<script>
  import commentsComp from "../components/comments-comp.vue" 
  export default {
    components: {
      commentsComp
    },
    data() {
      return {
        detailId: '',
        extra: {},
        lang_comments: [],
        short_comments: [],
        loading: false,
      }
    },
    route: {
      activate(transition) {
        var _this = this
        _this.detailId = window.sessionStorage.detailId
        _this.extra = JSON.parse(window.sessionStorage.extra)
        _this.getComments()
        transition.next()
      }
    },
    methods: {
      getComments() {
        let _this = this
        _this.loading = true
        //http://news-at.zhihu.com/api/4/story/4232852/long-comments
        fetch('http://news-at.zhihu.com/api/4/story/'+_this.detailId+'/long-comments')
          .then(res => res.json())
          .then(json => {
            _this.$set('lang_comments', json.comments)
            _this.loading = false
          })
        fetch('http://news-at.zhihu.com/api/4/story/'+_this.detailId+'/short-comments')
          .then(res => res.json())
          .then(json => {
            _this.$set('short_comments', json.comments)
            _this.loading = false
          })
      },
      goBack() {
        window.history.back()
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";
  #comments-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: size(150);
    background-color: $main-blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: size(50);
    color: $white;
    z-index: 4;
    h2 {
      position: relative;
      font-size: 15px;
      left: size(-250);
    }
    i {
      font-family: "iconfont";
      font-style: normal;
      font-size: 20px;
    }
  }
  
  .comments-count {
    padding-left: size(50);
    font-size: 15px;
    height: size(150);
    line-height: size(150);
    border-bottom: 1px solid rgb(150,150,150);
    border-top: 1px solid rgb(150,150,150);
  }

  #comments-lang {
    padding-top: size(150);
    ul {
      
    }
    .no-lang-comments {
      padding-bottom: size(670);
      text-align: center;
      i {
        font-family: "iconfont";
        font-style: normal;
        font-size: 200px;
        color: $bg-gray;
      }
      p {
        color: $gray;
        font-size: 20px;
      }
    }
  }


</style>






