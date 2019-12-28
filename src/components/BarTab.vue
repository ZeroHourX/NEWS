<template>
  <div class="bar">
    <div class="tap">
      <div class="title">{{title}}</div>
      <div class="text">{{text}}</div>
      <i class="iconfont icon-you"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "text"]
};
</script>

<style scoped lang="less">
.bar {
  padding: 0 0 0 1.25rem;
  .tap {
    border-bottom: 1px #ddd solid;
    padding: 15px 20px 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ddd;
    .title {
      font-size: 1.125rem;
      color: #000;
    }
    .text {
      font-size: 1rem;
      flex: 1;
      text-align: right;
      padding: 0 10px;
    }
  }
}
</style>