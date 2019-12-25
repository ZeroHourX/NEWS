import Vue from "vue"
import App from '@/App'
import VueRouter from 'vue-router'

import Login from '@/page/Login'

Vue.use(VueRouter)


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