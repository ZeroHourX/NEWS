<template>
  <div>
    <!-- <video controls autoplay name="media">
      <source :src="$route.params.id === '7' ? mp4 : data.content" type="video/mp4" />
    </video>-->

    <div class="video">
      <div ref="video" id="dplayer"></div>
    </div>
  </div>
</template>

<script>
import DPlayer from "dplayer";

export default {
  props: ["data"],
  data() {
    return {
      mp4: this.data.content,
      play: null
    };
  },
  methods: {
    handclick() {}
  },
  mounted() {
    this.play = this.$refs.video;
    const dp = new DPlayer({
      container: this.play,
      autoplay: true,
      loop: true,
      logo: "/static/QQ图片20190831203919.jpg",
      video: {
        url: this.mp4
      }
    });
  },
  created() {}
};
</script>

<style scoped lang="less">
.video {
  width: 100%;
}
/deep/.dplayer-logo {
  width: 30/360 * 100vw;
  height: 30/360 * 100vw;
  top: 20/360 * 100vw;
}
</style>