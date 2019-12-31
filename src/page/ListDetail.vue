<template>
  <div>
    <div class="bottom">
      <div class="conten">
        <div class="head">
          <i class="iconfont icon-zuo1" @click="$router.back()"></i>
          <i class="iconfont icon-new"></i>
          <div class="foucs">关注</div>
          <div class="foucs onfoucs" v-if="false">已关注</div>
        </div>

        <div class="content">
          <h3>瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。</h3>
          <div class="user">
            <span>火星时报</span>
            <span>1008611</span>
          </div>

          <div class="contents">
            瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项
            瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项
            瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项
            瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项
          </div>
        </div>

        <div class="post_btn">
          <div class="dz" :class="bg_red ? 'bg_red' : ''">
            <i class="iconfont icon-dianzan"></i>
            <span>99+</span>
          </div>
          <div class="wx">
            <i class="iconfont icon-weixin"></i>
            <span>微信</span>
          </div>
        </div>
      </div>
    </div>

    <PostFooter />
  </div>
</template>

<script>
import PostFooter from "@/components/PostFooter";
export default {
  data() {
    return {
      bg_red: true
    };
  },
  components: {
    PostFooter
  }
};
</script>

<style scoped lang="less">
.bottom {
  border-bottom: 5px #e4e4e4 solid;
  padding-bottom: 20/360 * 100vw;
  .conten {
    padding: 0 10px;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 20px;
      }
      .icon-new {
        flex: 1;
        font-size: 54/360 * 100vw;
        height: 54/360 * 100vw;
        line-height: 54/360 * 100vw;
        margin-left: 5px;
        color: #000;
      }
      .foucs {
        background: #f00;
        color: #fff;
        width: 62/360 * 100vw;
        height: 26/360 * 100vw;
        line-height: 26/360 * 100vw;
        text-align: center;
        border-radius: 50px;
      }
      .onfoucs {
        background: #f2f2f2;
        color: #bbb;
        border: 1px #bbb solid;
        box-sizing: border-box;
      }
    }

    .content {
      h3 {
        color: #000;
        font-size: 18/360 * 100vw;
        margin-bottom: 5px;
      }
      .user {
        color: #bbb;
        span {
          margin-right: 10px;
        }
      }
      .contents {
        font-size: 14/360 * 100vw;
        padding: 15px 0;
        // line-height: 2;
      }
    }
    .post_btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 15px;
      div {
        border: 1px #bbb solid;
        border-radius: 50px;
        width: 79/360 * 100vw;
        height: 29/360 * 100vw;
        line-height: 29/360 * 100vw;
        text-align: center;
        box-sizing: border-box;
      }
      .bg_red {
        background: #f00;
        color: #fff;
        border: 0;
      }
      .wx {
        i {
          color: #06c806;
        }
      }
    }
  }
}
</style>