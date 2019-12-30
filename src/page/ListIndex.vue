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
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.head_search {
  height: 50/360 * 100vw;
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
    padding: 10px 20px;
    margin: 0 20px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    border-radius: 50px;
  }
  .geren i {
    font-size: 30px;
    color: #fff;
  }
}
</style>