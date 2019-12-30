<template>
  <div>
    <HeaderNormal title="我的跟帖" />

    <div class="comment-item" v-for="(item,index) in parent" :key="index">
      <div class="time">
        <span>2019-12-30</span>
        <span>05:04</span>
      </div>

      <div class="comments" v-if="item.parent">
        <p>回复：{{item.parent.user.nickname}}</p>
        <p>{{item.parent.content}}</p>
      </div>

      <div class="comment">
        <p>{{item.content}}</p>
        <router-link to="#">
          <span class="van-ellipsis">原文：{{item.post.title}}</span>
          <i class="iconfont icon-you-"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
export default {
  data() {
    return {
      parent: {}
    };
  },
  components: {
    HeaderNormal
  },
  mounted() {
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.parent = data;
    });
  }
};
</script>

<style scoped lang="less">
.comment-item {
  padding: 20px;
  border-bottom: 1px #bbb solid;
  .time {
    font-size: 16px;
    color: #bbb;
  }
  .comments {
    margin-top: 10px;
    background: #e4e4e4;
    padding: 10px;
    line-height: 2;
    color: #989898;
    p:last-child {
      font-size: 14px;
    }
  }
  .comment {
    p {
      line-height: 3;
      font-size: 16px;
      color: #000;
    }
    a {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #989898;
        width: 90%;
      }
      i {
        color: #bbb;
      }
    }
  }
}
</style>