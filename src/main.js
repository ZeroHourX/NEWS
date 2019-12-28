import Vue from "vue"
import App from '@/App'
import VueRouter from 'vue-router'

import Vant from 'vant';
import { Toast } from 'vant'
import axios from 'axios'

import Login from '@/page/Login'
import Registration from "@/page/Registration"
import Personal from "@/page/Personal"

Vue.use(VueRouter)
Vue.use(Vant);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000"
const router = new VueRouter({
    routes: [
        // dynamic segments start with a colon
        { path: '/login', component: Login },
        { path: '/registration', component: Registration },
        { path: '/personal', component: Personal },
    ]
})
// 添加响应拦截器
axios.interceptors.response.use(res => {
    if (res.data.statusCode === 401 || res.data.statusCode === 400) {
        Toast.fail(res.data.message);
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