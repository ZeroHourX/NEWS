<template>
  <div>
    <comments :data="data.parent" v-if="data.parent" />

    <div class="min_comments">
      <div class="warp_user">
        <div class="user">
          <p>{{data.user.id}}</p>
          <p>{{data.user.nickname}}</p>
          <p>{{data.user.username}}</p>
        </div>
        <!-- <div class="btn">回复</div> -->
      </div>
      <div class="title">{{data.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments",
  props: ["data"]
};
</script>

<style scoped lang="less">
.min_comments {
  padding: 15/360 * 100vw;
  border: 1px #ddd solid;
  border-radius: 10px;
  .warp_user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    p {
      margin-right: 5px;
      &:last-child {
        color: #bbb;
      }
    }
    .user {
      display: flex;
    }
    .btn {
      color: #bbb;
    }
  }
}
</style>