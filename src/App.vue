<template>
  <div id="app">
    <keep-alive include="index,search">
      <!-- //占位组件 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
@import url(http://at.alicdn.com/t/font_1587733_x5zqi8f7dxo.css);
@import url(../node_modules/vant/lib/index.css);
html,
body,
#app {
  background: #f2f2f2;
}
/*清除内外边距  */
* {
  margin: 0;
  padding: 0;
}
/*让所有斜体 不倾斜*/
em,
i {
  font-style: normal;
}
/*去掉列表前面的小点*/
li {
  list-style: none;
}
/*图片没有边框   去掉图片底侧的空白缝隙*/
img {
  border: 0; /*ie6*/
  vertical-align: middle;
}
/*让button 按钮 变成小手*/
button {
  cursor: pointer;
}
/*取消链接的下划线*/
a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: #e33333;
}

button,
input {
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    \\5b8b\4f53, sans-serif;
}

body {
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    \\5b8b\4f53, sans-serif;
  color: #666;
}

.hide,
.none {
  display: none;
}
/*清除浮动*/
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.al {
  text-align: left;
}

.ac {
  text-align: center;
}

.ar {
  text-align: right;
}
</style>