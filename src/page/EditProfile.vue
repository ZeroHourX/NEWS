<template>
  <div>
    <HeaderNormal title="编辑资料" />

    <div class="content">
      <div class="head_img">
        <img :src="profile.head_img" alt />
        <van-uploader class="upload" :after-read="afterRead" />
      </div>

      <BarTab title="昵称" :text="profile.nickname" @click="showNickname = !showNickname" />
      <van-dialog v-model="showNickname" title="编辑昵称" show-cancel-button @confirm="handNickname">
        <van-field
          :value="profile.nickname"
          placeholder="请输入昵称"
          maxlength="10"
          show-word-limit
          ref="nickname"
        />
      </van-dialog>

      <BarTab title="密码" :text="profile.password" type="password" />
      <BarTab title="性别" :text="profile.gender == 0 ? '女' : '男'" />
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
import BarTab from "@/components/BarTab";
import { log } from "util";
export default {
  data() {
    return {
      profile: {},
      showNickname: false
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData();
      formData.append("file", file.file);

      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: formData
      }).then(res => {
        const { data } = res.data;
        this.profile.head_img = this.$axios.defaults.baseURL + data.url;

        //实时修改后台数据头像
        this.Axios("/user_update/", "POST", {
          head_img: data.url
        });
      });
    },

    handNickname() {
      const { value } = this.$refs.nickname.$refs.input;
      this.Axios("/user_update/", "POST", {
        nickname: value
      });
      this.profile.nickname = value;
    },

    //自定义Axios函数
    Axios(url, type, userinfo) {
      this.$axios({
        url: url + localStorage.getItem("user_id"),
        method: type,
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: userinfo
      }).then(res => {
        this.$toast.success(res.data.message);
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.profile = data;
      if (data) {
        if (data.head_img) {
          this.profile.head_img = this.$axios.defaults.baseURL + data.head_img;
        } else {
          this.profile.head_img = "../static/moren.jpg";
        }
      }
    });
  },
  components: {
    HeaderNormal,
    BarTab
  }
};
</script>

<style lang="less" scoped>
.content {
  .head_img {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 100/360 * 100vw;
      height: 100/360 * 100vw;
      border-radius: 50%;
    }
    .upload {
      position: absolute;
      opacity: 0;
    }
  }
}
/deep/.van-uploader__upload {
  width: 100/360 * 100vw;
  height: 100/360 * 100vw;
  border-radius: 50%;
  margin: 0;
}
</style>