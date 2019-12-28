<template>
  <div class="button" @click="$emit('click')">{{text}}</div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style scoped lang="less">
.button {
  background: #cc3300;
  font-size: 1.25rem;
  border-radius: 50px;
  text-align: center;
  color: #fff;
  padding: 10px;
  margin-top: 2.125rem;
}
</style>