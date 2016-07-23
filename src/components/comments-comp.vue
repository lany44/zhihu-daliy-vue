<template>
  <li class="comment-box  s-{{* comment.id}} ">
    <div class="comment-info">
      <img :src="comment.avatar | replaceImgUrlAPI" alt="头像">
      <div>
        <span>{{comment.author}}</span>
        <span><i>&#xe611</i> {{comment.likes}}</span>
      </div>
    </div>
    <div class="comment-body">
      <p>{{comment.content}}</p>
      <p class="reply" v-if="comment.reply_to">
      //{{comment.reply_to.author}}:
      <span>{{comment.reply_to.content}}</span>
      </p>
    </div>
    <div class="comment-time">{{comment.time | formatTimeAPI 'MM-dd hh:mm'}}</div>
  </li>
</template>

<script>
  export default {
    props: ['comment'],
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/variable.scss";
  .comment-box {
    font-size: 7px;
    position: relative;
    border-bottom: 1px solid $gray;
    div.comment-info {
      width: 100%;
      height: size(100);
      line-height: size(100);
      font-size: 15px;
      img {
        float: left;
        width: size(100);
        margin: size(30) 0 0 size(30);
        border-radius: 50%;
      }
      div {
        display: flex;
        justify-content: space-between;
        padding: size(10) size(20);
        span {
        display: inline-block;
        }
        span:first-child {
          font-weight: bold;
        }
        span:last-child {
          padding-right: size(30);  
          color: rgb(180,180,180);
          i {
            font-family: "iconfont";
            font-style: normal;
          }
        }
      }
      
    }
    div.comment-body {
      margin: 0 size(100) 0 size(150);
      .reply {
        font-weight: bold;
        >span {
          font-weight: normal;
          color: #8c8c8c;
        }
      }
    }
    div.comment-time {
      color: rgb(140,140,140);
      margin  : size(20) size(150);
    }
  }
</style>