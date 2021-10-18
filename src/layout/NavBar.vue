<template>
  <el-header>
    <div class="header-top">
      <!-- 菜单栏开合 控制按钮 -->
      <div
        class="open-icon iconfont icon-shousuo"
        :class="{ rotate: isCollapse }"
        @click="collapse"
      ></div>
      <!-- 面包屑 -->
      <BreadCrumb class="crumb"/>
      <!-- 右侧 -->
      <div class="header-top-right">
        <!-- 全屏按钮 -->
        <div class="open-icon iconfont"
        :class="[!screenfullBut ? 'icon-quanping': 'icon-tuichuquanping']"
        @click="fullscreen"
      ></div>
        <!-- 头像 下拉菜单 -->
        <el-dropdown trigger="click">
          <div class="el-dropdown-link">
            <img src="~@/assets/img/user_icon.gif" alt="" />
            <span>{{ name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="gitee">码云地址</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu></el-dropdown
        >
      </div>
    </div>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
// 面包屑导航
import BreadCrumb from '@/components/breadcrumb/BreadCrumb'
// 引入全屏插件
import screenfull from 'screenfull'
export default {
  name: 'NavBar',
  components: {
    BreadCrumb
  },
  data() {
    return {
      screenfullBut: false // 全屏按钮状态
    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'name'])
  },
  methods: {
    // 控制菜单栏开合
    collapse() {
      this.$store.dispatch('app/setIsCollapse')
    },
    // 全屏功能
    fullscreen() {
      if (!screenfull.isEnabled) {
        this.$notification.open({
          message: '温馨提示',
          description:
            '您的浏览器无法使用全屏功能，请更换谷歌浏览器或者请手动点击F11按钮全屏展示！',
          duration: 10,
          placement: 'bottomLeft'
        })
        return false
      }
      screenfull.toggle()
      if (screenfull.isFullscreen) {
        this.screenfullBut = false
      } else {
        this.screenfullBut = true
      }
    },
    // 退出
    logout() {
      this.$store.dispatch('user/logout').then((res) => {
        this.$message.success(res)
        this.$router.push('/login')
      })
    },
    // gitee 仓库地址
    gitee() {
      window.open('https://gitee.com/yty1998/vue_shop.git')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  z-index: 1;
  height: 50px !important;
  padding-left: 0;
  box-shadow: 0px 0px 7px -2px #ccc;
  overflow: hidden;
  .header-top {
    line-height: 50px;
    .crumb {
      line-height: 50px;
      float: left;
    }
    .open-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      float: left;
      width: 50px;
      height: 50px;
      &:hover {
        cursor: pointer;
      }
      &:active {
        background-color: #eaeaea;
      }
    }
    .iconfont {
      font-size: 25px;
    }
    .rotate {
      transform: rotate(180deg);
    }
    .header-top-right {
      float: right;
      .el-dropdown-link {
        display: flex;
        span{
          margin-left: 5px;
        }
        img {
          width: 40px;
          height: 40px;
          margin-top: 5px;
          border-radius: 10px;
        }
        .el-icon--right{
          margin: auto;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
