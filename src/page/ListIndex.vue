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

    <van-tabs v-model="active" sticky animated swipeable background="#e4e4e4">
      <van-tab v-for="(item,index) in category" :title="item.name" :key="index">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="我也是有底线的( •̀ ω •́ )y"
          @load="onLoad"
          :immediate-check="false"
        >
          <PostList v-for="(item,index) in item.post" :key="index" :post="item" />
        </van-list>
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
      pageIndex: 1,
      pageSize: 10
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        const categores = this.category[this.active];
        // 文章列表
        this.$axios({
          url: `/post?pageIndex=${categores.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
        }).then(res => {
          const { data } = res.data;
          if (data.length < this.pageSize) {
            // 数据全部加载完成
            categores.finished = true;
          }

          categores.post = [...categores.post, ...data];

          categores.pageIndex++;
          // 加载状态结束
          categores.loading = false;
        });
      }, 500);
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
      const { data } = res.data;
      const newData = [];
      data.forEach(v => {
        v.post = [];
        v.loading = false;
        v.finished = false;
        v.pageIndex = 1;
        newData.push(v);
      });
      this.category = newData;
      // 文章列表
      this.$axios({
        url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
      }).then(res => {
        this.category[this.active].post = res.data.data;
        this.category[this.active].pageIndex++;
      });
    });
  },
  watch: {
    active() {
      this.cid = this.category[this.active].id;
      this.onLoad();
    }
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