<template>
  <div class="center">
    <div class="del">
      <i class="iconfont icon-guanbi"></i>
    </div>

    <div class="logo">
      <i class="iconfont icon-new"></i>
    </div>

    <!-- 输入框组件 -->
    <AuthInput
      type="del"
      placeholder="用户名/手机号码"
      :rule="/^1[0-9]{4,10}$/"
      v-model="form.username"
      err_message="手机号码格式错误"
    />

    <AuthInput
      type="password"
      placeholder="密码"
      :rule="/^[0-9a-zA-z]{3,12}$/"
      v-model="form.password"
      err_message="密码格式错误"
    />

    <p>
      没有账号？
      <router-link to="/Registration">立即注册</router-link>
    </p>

    <AuthButton text="登录" @click="handleSubim" />
  </div>
</template>

<script>
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    AuthInput,
    AuthButton
  },
  methods: {
    handleSubim() {
      this.$axios({
        url: "/login",
        method: "POST",
        data: this.form
      }).then(res => {
        const { message, data } = res.data;

        if (message === "登录成功") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user.id);
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.center {
  padding: 1.25rem;
}
.del {
  i {
    font-size: 1.875rem;
  }
}
.logo {
  text-align: center;
  i {
    font-size: 7.25rem;
    color: #cc3300;
  }
}
p {
  text-align: right;
  margin-top: 10px;
  font-size: 14px;
  a {
    color: blue;
  }
}
</style>