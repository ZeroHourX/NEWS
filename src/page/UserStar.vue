<template>
  <div>
    <HeaderNormal title="我的收藏" />

    <PostList v-for="(item,index) in detail" :key="index" :post="item" />
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
import PostList from "@/components/PostList";
export default {
  data() {
    return {
      detail: []
    };
  },
  mounted() {
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      const newData = [];
      data.forEach(v => {
        v.comment_length = "99+";
        newData.push(v);
      });
      this.detail = newData;
    });
  },
  components: {
    HeaderNormal,
    PostList
  }
};
</script>

<style>
</style>