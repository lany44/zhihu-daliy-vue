<template>
  <div id="mainDefault">
    <slider :top_stories="topStories" v-cloak></slider>

    <ul class="main-list-box s-{{* date}}" v-for="item in allStories">
      <h2 class="title">{{item.date | dateTimeAPI}}</h2>
      <list-comp v-for="subItem in item.stories" :item="subItem"></list-comp>
    </ul>

  </div>
</template>

<script>
  import slider from '../components/slider.vue'
  import listComp from '../components/list-comp.vue'

  export default {
    components: {
      slider,
      listComp
    },
    data() {
      return {
        topStories: [],
        allStories: [],
        date: '',
        loading: false,
        dateArr: [],
        titleTip: ''
      }
    },
    ready() {
      this.getLatest()
    },
    route: {
      data(transition) {
        var _this = this
        if(transition.from.name === 'detail') {
          _this.$nextTick(() => {window.document.body.scrollTop = window.sessionStorage.scrollTop})
        }else {
          window.document.body.scrollTop = 0
        }
        window.addEventListener('scroll', _this.getScrollList, false)
        window.addEventListener('scroll', _this.whatsTitle, false)
        transition.next()
      },
      deactivate(transition) {
        var _this = this
        window.removeEventListener('scroll', _this.getScrollList, false)
        window.removeEventListener('scroll', _this.whatsTitle, false)
        window.sessionStorage.scrollTop = window.document.body.scrollTop
        transition.next()
      }
    },
    methods: {
      getLatest() {
        let _this = this
        _this.loading = true
        fetch('http://news-at.zhihu.com/api/4/news/latest')
          .then(res => res.json())
          .then(json => {
            _this.$set('allStories', _this.allStories.concat(json))
            _this.$set('topStories', json.top_stories)
            _this.$set('date', json.date)
            _this.dateArr.push(_this.date)
            _this.loading = false
          })
      },
      getNews() {
        let _this = this
        _this.loading = true
        fetch('http://news-at.zhihu.com/api/4/news/before/' + _this.date)
          .then(res => res.json())
          .then(json => {
            _this.$set('allStories', _this.allStories.concat(json))
            _this.$set('date', json.date)
            _this.dateArr.push(_this.date)
            _this.loading = false
          })
      },
      getScrollList() {
        var _this = this
        if((window.document.body.offsetHeight + window.document.body.scrollTop)+100>window.document.body.scrollHeight && !_this.loading) {
          _this.getNews()
        }
      },
      whatsTitle() {
        let dateArr = this.dateArr
        for(let i=0;i<dateArr.length;i++) {
          let top = document.querySelector('.s-'+dateArr[i]).getBoundingClientRect().top
          if(top<200 && top>100) {
            this.titleTip = dateArr[i-1]
            this.$dispatch('changeTile', this.titleTip)
          }
          if(top<100 && top>0) {
            this.titleTip = dateArr[i]
            this.$dispatch('changeTile', this.titleTip)
          }
        }
      },
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";

  #mainDefault {
    margin-top: size(148);
    background: $bg-gray;
  }

  .main-list-box {
    background-color: $bg-gray;
    padding: size(20);
    h2 {
      height: size(80);
      padding-top: size(20);
      padding-left: size(40);
      color: rgb(100,100,100);
    }
  }

</style>