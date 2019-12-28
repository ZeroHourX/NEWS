<template>
  <div>
    <div class="head_detala">
      <img :src="$axios.defaults.baseURL + profile.head_img" alt />
      <div class="detala">
        <div class="name">
          <i class="iconfont icon-xingbie-nv"></i>
          {{profile.nickname}}
        </div>
        <div class="time">2019-10-10</div>
      </div>
      <i class="iconfont icon-you"></i>
    </div>

    <BarTab title="我的关注" text="关注的用户" />
    <BarTab title="我的跟帖" text="跟帖/收藏" />
    <BarTab title="我的收藏" text="文章/视频" />
    <BarTab title="设置" />
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
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.profile = data;
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