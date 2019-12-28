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
    err_message="手机号码格式错误"/>

    <AuthInput 
    type="password" 
    placeholder="密码" 
    :rule="/^1[0-9]{4,10}$/" 
    v-model="form.password" 
    err_message="密码格式错误"/>

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
      console.log(this.form);
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
</style>