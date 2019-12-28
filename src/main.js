import Vue from "vue"
import Vant from 'vant';
import App from '@/App'
import VueRouter from 'vue-router'

import Login from '@/page/Login'

Vue.use(VueRouter)
Vue.use(Vant);


const router = new VueRouter({
    routes: [
        // dynamic segments start with a colon
        { path: '/login', component: Login }
    ]
})

new Vue({
    el: "#app",
    router,
    render(createElement) {
        return createElement(App)
    }
})