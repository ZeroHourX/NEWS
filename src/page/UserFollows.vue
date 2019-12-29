<template>
  <div>
    <HeaderNormal title="我的关注" />

    <div class="item" v-for="(item,index) in follows" :key="index">
      <img :src="$axios.defaults.baseURL + item.head_img" alt />

      <div class="text">
        <p>{{item.nickname}}</p>
        <span>{{item.username}}</span>
      </div>

      <div class="btn" @click="handIndex(index,item.id)">取消关注</div>
    </div>
    
    <van-dialog
      v-model="show"
      title="取消关注"
      show-cancel-button
      confirmButtonColor="#f00"
      @confirm="handCancel(index,id)"
    >
      <p class="tis">{{message}}</p>
    </van-dialog>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
export default {
  data() {
    return {
      follows: [],
      show: false,
      message: "确认取消关注?",
      index: "",
      id: ""
    };
  },
  methods: {
    handIndex(index, id) {
      this.index = index;
      this.id = id;
      this.show = !this.show;
    },
    handCancel(index, id) {
      this.$axios({
        url: "/user_unfollow/" + id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        this.follows.splice(index, 1);
        this.$toast.success(res.data.message);
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.follows = data;
    });
  },
  components: {
    HeaderNormal
  }
};
</script>

<style scope lang="less">
.tis {
  text-align: center;
  padding: 10px;
  color: #f00;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px #999 solid;
  img {
    width: 50/360 * 100vw;
    height: 50/360 * 100vw;
    border-radius: 50%;
  }
  .text {
    flex: 1;
    padding: 10px;
    font-size: 18px;
    span {
      font-size: 14px;
      color: #ccc;
    }
  }
  .btn {
    background: #e1e1e1;
    padding: 8px 13px;
    border-radius: 50px;
  }
}
</style>