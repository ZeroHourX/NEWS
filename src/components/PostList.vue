<template>
  <div>
    <!-- 一张图 -->
    <div class="img_one" v-if="post.cover.length > 0 && post.cover.length < 3 && post.type===1">
      <div class="title">
        <router-link :to="`/list_detail/${post.id}`">
          <p class="van-multi-ellipsis--l2">{{post.title}}</p>
        </router-link>
        <div class="user">
          <p>{{post.user.nickname}}</p>
          <p>{{post.comment_length}}跟帖</p>
        </div>
      </div>
      <router-link :to="`/list_detail/${post.id}`">
        <div class="img">
          <img :src="post.cover[0].url" alt />
        </div>
      </router-link>
    </div>

    <!-- 三张图 -->
    <div class="img_three" v-if="post.cover.length >= 3 && post.type===1">
      <div class="title">
        <router-link :to="`/list_detail/${post.id}`">
          <p class="van-multi-ellipsis--l2">{{post.title}}</p>
        </router-link>
        <router-link :to="`/list_detail/${post.id}`">
          <div class="img_if">
            <div class="img" v-for="(item,index) in post.cover" :key="index">
              <img v-if="index < 3" :src="item.url" alt />
            </div>
          </div>
        </router-link>
        <div class="user">
          <p>{{post.user.nickname}}</p>
          <p>{{post.comment_length}}跟帖</p>
        </div>
      </div>
    </div>

    <!-- 视频 -->
    <div class="video" v-if="post.type === 2">
      <div class="title">
        <router-link :to="`/list_detail/${post.id}`">
          <p class="van-multi-ellipsis--l2">{{post.title}}</p>
        </router-link>
        <router-link :to="`/list_detail/${post.id}`">
          <div class="img_if">
            <div class="img">
              <img :src="post.cover[0].url" alt />
              <span class="video_tip"></span>
            </div>
          </div>
        </router-link>
        <div class="user">
          <p>{{post.user.nickname}}</p>
          <p>{{post.comment_length}}跟帖</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style scoped lang="less">
.img_one {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px #ddd solid;
  .title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    height: 75/360 * 100vw;
    line-height: 1.3;
  }
  .img {
    margin-left: 10px;
    img {
      width: 121/360 * 100vw;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }
}

.img_three {
  padding: 13px 10px;
  border-bottom: 1px #ddd solid;
  .title {
    font-size: 16px;
    .img_if {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .img {
        width: 33%;
        height: 75/360 * 100vw;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}

.video {
  padding: 13px 10px;
  border-bottom: 1px #ddd solid;
  .title {
    font-size: 16px;
    .img_if {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .img {
        width: 100%;
        height: 175/360 * 100vw;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .video_tip {
          width: 55/360 * 100vw;
          height: 55/360 * 100vw;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          &::before {
            content: " ";
            display: block;
            overflow: hidden;
            width: 0;
            height: 0;
            border-bottom: 0.9375rem solid transparent;
            border-top: 0.9375rem solid transparent;
            border-left: 1.25rem solid #fff;
            border-radius: 5px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            margin: 0 3px;
          }
        }
      }
    }
  }
}

.user {
  display: flex;
  p {
    margin-right: 10px;
    color: #bbb;
    font-size: 14px;
  }
}
</style>