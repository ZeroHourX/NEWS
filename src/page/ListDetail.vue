<template>
  <div class="main">
    <div class="bottom">
      <div class="conten" v-if="detail.type === 1">
        <div class="head">
          <i class="iconfont icon-zuo1" @click="$router.back()"></i>
          <i class="iconfont icon-new"></i>
          <div class="foucs" v-if="!detail.has_follow" @click="handfollow">关注</div>
          <div class="foucs onfoucs" v-else @click="handunfollow">已关注</div>
        </div>

        <div class="content">
          <h3>{{detail.title}}</h3>
          <div class="user">
            <span>{{detail.user.nickname}}</span>
            <span>{{detail.user.username}}</span>
          </div>

          <div class="contents" v-html="detail.content"></div>
        </div>
      </div>

      <!-- 播放器功能待完善和学习 -->
      <div class="video" v-if="detail.type === 2">
        <div class="conten">
          <div class="head">
            <i class="iconfont icon-zuo1" @click="$router.back()"></i>
            <i class="iconfont icon-new"></i>
          </div>
        </div>
        <Video :data="detail" />
        <div class="user">
          <div class="user_name">
            <img :src="$axios.defaults.baseURL + detail.user.head_img" alt />
            <span>{{detail.user.username}}</span>
          </div>
          <div class="user_btn">
            <div class="foucs" v-if="!detail.has_follow" @click="handfollow">关注</div>
            <div class="foucs onfoucs" v-else @click="handunfollow">已关注</div>
          </div>
        </div>
        <h3>{{detail.title}}</h3>
      </div>

      <div class="post_btn">
        <div class="dz" :class="detail.has_like ? 'bg_red' : ''" @click="handlike">
          <i class="iconfont icon-dianzan"></i>
          <span>{{detail.like_length}}</span>
        </div>
        <div class="wx">
          <i class="iconfont icon-weixin"></i>
          <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1">
            <span>微信</span>
          </a>
        </div>
      </div>
    </div>

    <div class="comments">
      <h3>精彩跟帖</h3>
      <div class="comments_warp" v-for="(item,index) in comments" :key="index" v-if="index < 2">
        <div class="warp">
          <div class="warp_btn">
            <div class="warp_user">
              <img :src="item.user.head_img" alt />
              <div class="user">
                <p>{{item.user.nickname}}</p>
                <p>{{item.user.username}}</p>
              </div>
            </div>
          </div>
          <CommentsFloor v-if="item.parent" :data="item.parent" :index="index" />
          <div class="title">{{item.content}}</div>
        </div>
      </div>
      <h4
        v-if="detail.comment_length > 0 && detail.comment_length > 2"
        class="bor_btn"
        @click="$router.push(`/post_comments/${$route.params.id}`)"
      >更多跟贴</h4>

      <div class="shafa" v-if="detail.comment_length === 0">暂无跟贴,抢占沙发</div>
    </div>

    <PostFooter :post="detail" @getComments="getComments" />
  </div>
</template>

<script>
import PostFooter from "@/components/PostFooter";
import CommentsFloor from "@/components/CommentsFloor";
import Video from "@/components/Video";

export default {
  data() {
    return {
      detail: {
        user: {}
      },
      comments: []
    };
  },
  methods: {
    handfollow() {
      this.$axios({
        url: "/user_follows/" + this.detail.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        this.detail.has_follow = !this.detail.has_follow;
        this.$toast.success(res.data.message);
      });
    },
    handunfollow() {
      this.$axios({
        url: "/user_unfollow/" + this.detail.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        this.detail.has_follow = !this.detail.has_follow;
        this.$toast.fail(res.data.message);
      });
    },
    handlike() {
      this.$axios({
        url: "/post_like/" + this.detail.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        this.detail.has_like = !this.detail.has_like;
        if (message === "点赞成功") {
          this.detail.like_length++;
        } else {
          this.detail.like_length--;
        }
      });
    },

    getComments() {
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
        this.comments = newData;
      });
    }
  },
  mounted() {
    const config = {
      url: "/post/" + this.$route.params.id
    };
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    this.$axios(config).then(res => {
      const { data } = res.data;
      this.detail = data;
    });

    this.getComments();
  },
  components: {
    PostFooter,
    CommentsFloor,
    Video
  }
};
</script>

<style scoped lang="less">
.shafa {
  color: #bbb;
  padding: 30px;
  text-align: center;
  font-size: 14px;
}
.main {
  padding-bottom: 80/360 * 100vw;
}
.bottom {
  border-bottom: 5px #e4e4e4 solid;
  padding-bottom: 20/360 * 100vw;
  .conten {
    padding: 0 10px;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 20px;
      }
      .icon-new {
        flex: 1;
        font-size: 54/360 * 100vw;
        height: 54/360 * 100vw;
        line-height: 54/360 * 100vw;
        margin-left: 5px;
        color: #000;
      }
    }

    .content {
      h3 {
        color: #000;
        font-size: 18/360 * 100vw;
        margin-bottom: 5px;
      }
      .user {
        color: #bbb;
        span {
          margin-right: 10px;
        }
      }
      .contents {
        font-size: 14/360 * 100vw;
        padding: 15px 0;
        line-height: 2;

        /deep/img {
          max-width: 100%;
        }
        /deep/p {
          text-indent: 15px;
        }
      }
    }
  }
  .post_btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
    div {
      border: 1px #bbb solid;
      border-radius: 50px;
      width: 79/360 * 100vw;
      height: 29/360 * 100vw;
      line-height: 29/360 * 100vw;
      text-align: center;
      box-sizing: border-box;
    }
    .bg_red {
      background: #f00;
      color: #fff;
      border: 0;
    }
    .wx {
      i {
        color: #06c806;
      }
    }
  }
}
.video {
  padding-bottom: 10px;

  h3 {
    padding: 0 10px;
  }
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .user_name {
      span {
        vertical-align: middle;
        margin-left: 5px;
      }
    }
    img {
      width: 25/360 * 100vw;
      height: 25/360 * 100vw;
      border-radius: 50%;
    }
  }
}

.foucs {
  background: #f00;
  color: #fff;
  width: 62/360 * 100vw;
  height: 26/360 * 100vw;
  line-height: 26/360 * 100vw;
  text-align: center;
  border-radius: 50px;
}
.onfoucs {
  background: #f2f2f2;
  color: #bbb;
  border: 1px #bbb solid;
  box-sizing: border-box;
}

.comments {
  padding: 20px 0;
  h3 {
    text-align: center;
  }
  .bor_btn {
    display: block;
    width: 100/360 * 100vw;
    height: 30/360 * 100vw;
    line-height: 30/360 * 100vw;
    border: 1px #bbb solid;
    border-radius: 50px;
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;
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
}
</style>