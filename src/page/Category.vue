<template>
  <div>
    <HeaderNormal title="栏目管理" />

    <div class="btn">
      <div class="one">
        <p>点击删除以下频道</p>
        <van-button
          v-for="(item,index) in caregory"
          :key="index"
          v-if="item.is_top === 1"
          type="default"
          size="small"
          :color="item.name === '关注' ? '#f00' : '#7fddad'"
          :disabled="item.name === '关注' ? true: false"
          @click="handistop(item)"
        >{{item.name}}</van-button>
      </div>

      <div class="zero">
        <p>点击添加以下频道</p>
        <van-button
          v-for="(item,index) in caregory"
          :key="index"
          v-if="item.is_top === 0"
          type="default"
          size="small"
          @click="handis_top(item)"
        >{{item.name}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
export default {
  data() {
    return {
      caregory: []
    };
  },
  methods: {
    handistop(e) {
      this.is_top(e, 0);
    },
    handis_top(e) {
      this.is_top(e, 1);
    },

    is_top(e, id) {
      this.$axios({
        url: "/category",
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          name: e.name,
          is_top: id
        }
      }).then(res => {
        this.$toast.success(res.data.message);

        const config = {
          url: "/category"
        };
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = {
            Authorization: localStorage.getItem("token")
          };
        }

        this.$axios(config).then(res => {
          const { data } = res.data;

          this.caregory = data;
        });
      });
    }
  },
  mounted() {
    const config = {
      url: "/category"
    };
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }

    this.$axios(config).then(res => {
      this.caregory = res.data.data;
    });
  },
  components: {
    HeaderNormal
  }
};
</script>

<style scoped lang="less">
.btn {
  padding: 0 10px;
  p {
    padding: 10px 0;
  }
}
/deep/.van-button--small {
  padding: 0 8px;
  margin: 7px;
}
</style>