<template>
  <div class="main">
    <div class="head_search">
      <i class="iconfont icon-zuo1" @click="$router.back()"></i>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索关键字" v-model="value" @input="handinput" />
      </div>
      <div class="btn" @click="getList">搜索</div>
    </div>

    <div class="drop_down" v-if="value">
      <div
        class="item"
        v-for="(item,index) in newList"
        v-if="index < 5"
        :key="index"
        @click="$router.push(`/list_detail/${item.id}`)"
      >
        <p>{{item.title}}</p>
        <i class="iconfont icon-you"></i>
      </div>
    </div>

    <PostList v-for="(item,index) in list" :key="index" :post="item" />
  </div>
</template>

<script>
import PostList from "@/components/PostList";
export default {
  data() {
    return {
      value: "",
      list: [],
      newList: []
    };
  },
  methods: {
    handinput() {
      this.$axios({
        url: `/post_search?keyword=${this.value}`
      }).then(res => {
        this.newList = res.data.data;
      });
    },
    getList() {
      this.$axios({
        url: `/post_search?keyword=${this.value}`
      }).then(res => {
        this.list = res.data.data;
      });
      this.list = this.newList;
      this.value = "";
    }
  },
  mounted() {
    this.$axios({
      url: "/post"
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
.main {
  padding: 0 10/360 * 100vw;
  .drop_down {
    padding: 0 20px;
    border: 2px #ccc solid;
    border-top: 0;
    position: absolute;
    top: 59/360 * 100vw;
    left: 0;
    background: #f2f2f2;
    box-sizing: border-box;
  }
  .item {
    padding: 10px 0;
    font-size: 15px;
    border-bottom-color: #ddd;
    i {
      color: #bbb;
    }
  }
  .head_search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    .icon-zuo1 {
      font-size: 30/360 * 100vw;
    }
    .search {
      flex: 1;
      position: relative;
      margin: 0 10px;
      i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #bbb;
      }
      input {
        width: 100%;
        text-indent: 15px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 40/360 * 100vw;
        background: #f2f2f2;
        border: 1px #bbb solid;
        border-radius: 50px;
      }
    }
    .btn {
      color: #00f;
      font-size: 14px;
      background: #bbb;
      padding: 3px 8px;
      border-radius: 50px;
    }
  }
}
</style>