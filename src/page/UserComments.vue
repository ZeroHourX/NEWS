<template>
  <div>
    <HeaderNormal title="我的跟帖" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我也是有底线的U•ェ•*U"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="comment-item" v-for="(item,index) in parent" :key="index">
        <div class="time">
          <span>2019-{{11+index}}-{{1+index}}</span>
          <span>{{0+index >= 24 ? 0 : 0+index}}:04</span>
        </div>

        <div class="comments" v-if="item.parent">
          <p>回复：{{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
        </div>

        <div class="comment">
          <p>{{item.content}}</p>
          <router-link :to="`/list_detail/${item.post.id}`">
            <span class="van-ellipsis">原文：{{item.post.title}}</span>
            <i class="iconfont icon-you-"></i>
          </router-link>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
export default {
  data() {
    return {
      parent: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  methods: {
    onLoad() {
      this.$axios({
        url: `/user_comments?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { data } = res.data;
        if (data.length < this.pageSize) {
          this.finished = true;
        }
        this.loading = false;
        this.parent = [...this.parent, ...data];
        this.pageIndex++;
      });
    }
  },
  components: {
    HeaderNormal
  },
  mounted() {
    this.onLoad();
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