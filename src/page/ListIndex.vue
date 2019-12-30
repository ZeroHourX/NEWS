<template>
  <div>
    <div class="head_search">
      <i class="iconfont icon-new logo"></i>
      <router-link to="#" class="search">
        <i class="iconfont icon-sousuo"></i>
        <span>搜索新闻</span>
      </router-link>
      <router-link to="/personal" class="geren">
        <i class="iconfont icon-geren11"></i>
      </router-link>
    </div>

    <van-tabs v-model="active" sticky animated swipeable background="#e4e4e4" @click="onClick">
      <van-tab v-for="(item,index) in category" :title="item.name" :key="index">
        <PostList v-for="(item,index) in list" :key="index" :post="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
export default {
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0,
      category: [],
      cid: 999,
      list: []
    };
  },
  methods: {
    onClick(name, title) {
      this.cid = this.category[this.active].id;
      // 文章列表
      this.$axios({
        url: `/post?pageIndex=1&pageSize=10&category=${this.cid}`
      }).then(res => {
        this.list = res.data.data;
      });
    }
  },
  mounted() {
    //栏目
    const config = { url: "/category" };

    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    this.$axios(config).then(res => {
      this.category = res.data.data;
    });

    // 文章列表
    this.$axios({
      url: `/post?pageIndex=1&pageSize=10&category=${this.cid}`
    }).then(res => {
      this.list = res.data.data;
    });
  },
  components: {
    PostList
  }
};
</script>

<style scoped lang="less">
.head_search {
  height: 40/360 * 100vw;
  background: #ff0000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  .logo {
    font-size: 50/360 * 100vw;
    color: #fff;
  }
  .search {
    flex: 1;
    background: rgba(256, 256, 256, 0.5);
    padding: 5px 20px;
    margin: 0 20px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 50px;
  }
  .geren i {
    font-size: 30px;
    color: #fff;
  }
}
</style>