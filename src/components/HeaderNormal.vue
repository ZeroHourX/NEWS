<template>
  <div class="header">
    <i class="iconfont icon-zuo1" @click="$router.back()"></i>
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  font-size: 1.25rem;
  justify-content: center;
  align-items: center;
  padding: 10px;
  p {
    flex: 1;
    font-weight: 600;
    text-align: center;
    margin-left: -10%;
    overflow: hidden;
  }
  .iconfont {
    font-size: 1.875rem;
    z-index: 999;
  }
}
</style>