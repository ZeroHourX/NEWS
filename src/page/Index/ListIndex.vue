<template>
  <div>
    <div class="head_search">
      <i class="iconfont icon-new logo"></i>
      <router-link to="/post_search" class="search">
        <i class="iconfont icon-sousuo"></i>
        <span>搜索新闻</span>
      </router-link>
      <router-link to="/personal" class="geren">
        <i class="iconfont icon-geren11"></i>
      </router-link>
    </div>
    <router-link to="/category">
      <div class="xia_btn">
        <i class="iconfont icon-xia"></i>
      </div>
    </router-link>
    <van-tabs v-model="active" sticky animated swipeable background="#e4e4e4">
      <van-tab
        v-for="(item,index) in category"
        :title="item.name"
        :key="index"
        v-if="item.is_top === 1"
      >
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="我也是有底线的( •̀ ω •́ )y"
          @load="onLoad"
          :immediate-check="false"
        >
          <PostList v-for="(item,index) in item.post" :key="index" :post="item" />

          <van-loading color="#1989fa" v-if="item.post.length ===0 && !item.finished" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import config from "@/page/Index/index";
export default config;
</script>

<style scoped lang="less">
@import url("index.less");
</style>