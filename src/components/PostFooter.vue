<template>
  <div class="footer">
    <div class="normal" v-if="isfous">
      <div class="btn_footer" @click="handClick">写跟贴</div>
      <div class="btn_icon">
        <router-link :to="`/post_comments/${post.id}`">
          <div class="btn1">
            <em>{{post.comment_length}}</em>
            <i class="iconfont icon-pinglun1"></i>
          </div>
        </router-link>
        <div :class="post.has_star ? 'btn2': ''" @click="handstar">
          <i class="iconfont icon-collect"></i>
        </div>
        <div class="btn3">
          <i class="iconfont icon-fenxiang"></i>
        </div>
      </div>
    </div>

    <div class="textarea" v-else @mouseleave="handblus" @mousedown="handfocus">
      <van-cell-group class="textareas">
        <van-field
          v-model="value"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="@:火星网友"
          show-word-limit
          :clearable="true"
          ref="focus"
          :disabled="false"
        />
      </van-cell-group>
      <div class="textareas_btn" @click="handSubim">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      isfous: true,
      value: ""
    };
  },
  methods: {
    handClick() {
      this.isfous = !this.isfous;
      this.$nextTick(() => {
        if (this.isfous === false) {
          this.$refs.focus.focus();
        }
      });
    },
    handblus() {
      this.isfous = !this.isfous;
    },
    handfocus(event) {
      event.preventDefault(() => {
        this.$refs.focus.focus();
      });
    },
    handSubim() {
      this.isfous = !this.isfous;
      this.value = "";
    },
    handstar() {
      this.$axios({
        url: "/post_star/" + this.post.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        this.post.has_star = !this.post.has_star;
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style scoped lang="less">
.footer {
  border-top: 2px #e4e4e4 solid;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f2f2f2;
  .textarea {
    display: flex;
    align-items: flex-end;
    padding: 20px 10px 7px 10px;
    box-sizing: border-box;
    .textareas {
      flex: 1;
    }
    .textareas_btn {
      background: #f00;
      color: #fff;
      height: 26/360 * 100vw;
      line-height: 26/360 * 100vw;
      width: 59/360 * 100vw;
      border-radius: 50px;
      text-align: center;
      margin-left: 10px;
    }
  }
  .normal {
    display: flex;
    height: 30/360 * 100vw;
    padding: 20px 15px 10px 15px;
    .btn_footer {
      width: 55%;
      line-height: 30/360 * 100vw;
      text-indent: 20px;
      border-radius: 50px;
      background: #d7d7d7;
    }
    .btn_icon {
      display: flex;
      flex: 1;
      justify-content: space-around;
      align-items: center;
      position: relative;
      padding-left: 20px;
      i {
        font-size: 23/360 * 100vw;
      }
      .btn2 {
        color: orange;
      }
      em {
        position: absolute;
        top: -8/360 * 100vw;
        left: 35/360 * 100vw;
        display: block;
        background: #f00;
        color: #fff;
        border-radius: 50px;
        font-size: 8px;
        width: 32px;
        height: 15px;
        text-align: center;
      }
    }
  }
}
/deep/ .van-cell,
/deep/.van-cell-group {
  background: #d7d7d7;
  border-radius: 10px;
}
</style>