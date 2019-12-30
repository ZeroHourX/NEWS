<template>
  <div>
    <HeaderNormal title="个人中心" />
    <router-link to="/edit_profile">
      <div class="head_detala">
        <img :src="profile.head_img" alt />
        <div class="detala">
          <div class="name">
            <i
              class="iconfont icon-xingbie-nv"
              :class="profile.gender === 0 ? 'nv' : ''"
              v-if="profile.gender === 0"
            ></i>
            <i
              class="iconfont icon-xingbie-nan"
              :class="profile.gender === 1 ? 'nan' : ''"
              v-if="profile.gender === 1"
            ></i>
            {{profile.nickname}}
          </div>
          <div class="time">{{profile.username}}</div>
        </div>
        <i class="iconfont icon-you"></i>
      </div>
    </router-link>

    <router-link to="/user_follows">
      <BarTab title="我的关注" text="关注的用户" />
    </router-link>
    <router-link to="/user_comments">
      <BarTab title="我的跟帖" text="跟帖/收藏" />
    </router-link>
    <router-link to="/user_star">
      <BarTab title="我的收藏" text="文章/视频" />
    </router-link>
    <BarTab title="退出" @click="handleLogout" />
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
import BarTab from "@/components/BarTab";
export default {
  data() {
    return {
      profile: {}
    };
  },
  components: {
    BarTab,
    HeaderNormal
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
      .nv {
        color: #f0f;
      }
      .nan {
        color: #83c0ed;
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