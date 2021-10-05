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
        <BreadCrumb  class="crumb"/>
        <!-- 右侧头像区域 -->
      <div class="header-top-right">
        <!-- 头像 下拉菜单 -->
        <el-dropdown trigger="click">
          <div class="el-dropdown-link">
            <img src="~@/assets/img/user_icon.gif" alt="" /><i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
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
export default {
  name: 'NavBar',
  components: {
    BreadCrumb
  },
  computed: {
    ...mapGetters(['isCollapse'])
  },
  methods: {
    // 控制菜单栏开合
    collapse() {
      this.$store.dispatch('app/setIsCollapse')
    },
    // 退出
    logout() {
      this.$store.dispatch('user/logout').then((res) => {
        this.$message.success(res)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
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
        img {
          width: 40px;
          height: 40px;
          margin-top: 5px;
          border-radius: 10px;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
