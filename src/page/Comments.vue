<template>
  <div class="main">
    <HeaderNormal title="精彩跟帖" />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我也是有底线的U•ェ•*U"
      @load="onLoad"
      :immediate-check="false"
    >
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
            <div class="btn" @click="handreplay(item)" @mousedown="handfocus">回复</div>
          </div>
          <CommentsFloor v-if="item.parent" :data="item.parent" :index="index" />
          <div class="title">{{item.content}}</div>
        </div>
      </div>
    </van-list>

    <PostFooter
      :post="detail"
      @handreplay="handreplay"
      @getComments="getComments"
      :comments="comments"
      ref="footer"
    />
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
import CommentsFloor from "@/components/CommentsFloor";
import PostFooter from "@/components/PostFooter";
export default {
  data() {
    return {
      data: [],
      detail: {},
      comments: {},
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  components: {
    HeaderNormal,
    CommentsFloor,
    PostFooter
  },
  methods: {
    onLoad() {
      const { id } = this.$route.params;
      this.getComments(id);
    },
    handreplay(item) {
      this.comments = item;
    },
    getComments(id, isBtn) {
      if (isBtn === "isBtn") {
        this.pageIndex = 1;
        this.loading = true;
        this.finished = false;
        this.data = [];
      }
      this.$axios({
        url: `/post_comment/${id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
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
        this.data = [...this.data, ...newData];
        this.loading = false;
        if (data.length < this.pageSize) {
          this.finished = true;
          return;
        }
        this.pageIndex++;
      });

      const config = { url: "/post/" + id };

      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }
      this.$axios(config).then(res => {
        const { data } = res.data;
        this.detail = data;
      });
    },
    handfocus() {
      this.$refs.footer.handfocus(event);
    }
  },
  mounted() {
    const { id } = this.$route.params;
    this.getComments(id);
  }
};
</script>

<style scoped lang="less">
.main {
  margin-bottom: 100/360 * 100vw;
}
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