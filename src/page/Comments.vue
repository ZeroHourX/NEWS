<template>
  <div>
    <HeaderNormal title="精彩跟帖" />

    <div class="comments_warp" v-for="(item,index) in data" :key="index">
      <div class="warp">
        <div class="warp_btn">
          <div class="warp_user">
            <img :src="item.user.head_img" alt />
            <div class="user">
              <p>{{item.user.nickname}}</p>
              <p>{{item.user.username}}</p>
            </div>
          </div>
          <div class="btn">回复</div>
        </div>
        <CommentsFloor v-if="item.parent" :data="item.parent" />
        <div class="title">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
import CommentsFloor from "@/components/CommentsFloor";
export default {
  data() {
    return {
      data: {}
    };
  },
  components: {
    HeaderNormal,
    CommentsFloor
  },
  mounted() {
    this.$axios({
      url: "/post_comment/" + this.$route.params.id
    }).then(res => {
      const { data } = res.data;
      const newData = [];
      data.forEach(v => {
        if (!v.user.head_img) {
          v.user.head_img = "/static/moren.jpg";
        } else {
          v.user.head_img = this.$axios.defaults.baseURL + v.user.head_img;
        }
        newData.push(v);
      });
      this.data = newData;
    });
  }
};
</script>

<style scoped lang="less">
.comments_warp {
  border-bottom: 1px #bbb solid;
  .warp {
    padding: 15/360 * 100vw;

    .warp_btn {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      color: #bbb;
      padding: 10px 0;
      .warp_user {
        display: flex;
        p:first-child {
          color: #000;
          font-size: 14/360 * 100vw;
        }
        img {
          width: 40/360 * 100vw;
          height: 40/360 * 100vw;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .title {
      font-size: 16/360 * 100vw;
      margin-top: 10px;
    }
  }
}
</style>