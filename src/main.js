import Vue from "vue"
import App from '@/App'
import VueRouter from 'vue-router'

import Vant from 'vant';
import { Toast } from 'vant'
import axios from 'axios'

import routes from '@/routes'

Vue.use(VueRouter)
Vue.use(Vant);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000"
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // 是否有token
    const hasToken = localStorage.getItem("token");

    // 是否是个人中心页
    if (to.path === '/personal') {
        if (hasToken) {
            return next();
        } else {
            // 没有token则跳转到登录页
            return next("/login")
        }
    }
    next();
})

// 添加响应拦截器
axios.interceptors.response.use(res => {
    const { message, statusCode } = res.data;
    if (statusCode === 401 || statusCode === 400) {
        Toast.fail(message);
    }

    if (message === "用户信息验证失败!" || message === "用户信息验证失败") {
        // 跳转到登录页
        router.push("/login");
    }
    return res;
})

new Vue({
    el: "#app",
    router,
    render(createElement) {
        return createElement(App)
    }
})