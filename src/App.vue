<template>
    <div id="app">
        <router-link to="/login">登录页</router-link>

        
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message:"webpack"
        }
    },
}
</script>

<style>
    #app{
        color: #f00;
    }
</style>