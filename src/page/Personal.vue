<template>
  <div>
    <router-link to="/edit_profile">
      <div class="head_detala">
        <img :src="profile.head_img" alt />
        <div class="detala">
          <div class="name">
            <i class="iconfont icon-xingbie-nv"></i>
            {{profile.nickname}}
          </div>
          <div class="time">2019-10-10</div>
        </div>
        <i class="iconfont icon-you"></i>
      </div>
    </router-link>

    <BarTab title="我的关注" text="关注的用户" />
    <BarTab title="我的跟帖" text="跟帖/收藏" />
    <BarTab title="我的收藏" text="文章/视频" />
    <BarTab title="退出" @click="handleLogout" />
  </div>
</template>

<script>
import BarTab from "@/components/BarTab";
export default {
  data() {
    return {
      profile: {}
    };
  },
  components: {
    BarTab
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      this.$router.replace("/login");
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
  }
};
</script>

<style lang="less" scoped>
.head_detala {
  border-bottom: 5px #ccc solid;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 5.375rem;
    height: 5.375rem;
    border-radius: 50px;
  }
  .detala {
    flex: 1;
    padding: 10px;
    .name {
      font-size: 1rem;
      i {
        color: #f0f;
      }
    }
    .time {
      font-size: 0.875rem;
      color: #ccc;
    }
  }
  .icon-you {
    color: #ccc;
  }
}
</style>