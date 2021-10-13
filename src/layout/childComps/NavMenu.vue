<template>
  <el-aside :width="widthNow" class="aside-transition">
    <!-- 菜单栏 -->
    <el-menu
      :default-active="activeMenu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      @select="select"
    >
      <el-menu-item index="/home">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="'/' + menu.path"
        v-for="(menu, index) in listMenus"
        :key="menu.id"
      >
        <template slot="title">
          <i :class="icon[index]"></i>
          <span>{{ menu.authName }}</span>
        </template>
        <el-menu-item
          :index="'/' + item.path"
          v-for="item in menu.children"
          :key="item.id"
        >
          <template slot="title">
            <i class="iconfont icon-xuanxiang"></i>
            <span>{{ item.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/reports">
        <i class="iconfont icon-shujutongji"></i>
        <span slot="title">数据可视化</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavMenu',
  props: {
    listMenus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      icon: [
        'iconfont icon-yonghuguanli',
        'iconfont icon-quanxianguanli',
        'iconfont icon-shangpinguanli',
        'iconfont icon-dingdanguanli',
        'iconfont icon-shujutongji'
      ]
    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'device']),
    widthNow() {
      return this.isCollapse ? '60px' : '200px'
    },
    // 默认选中项
    activeMenu() {
      return this.$route.path
    }
  },
  methods: {
    /**
     * 选择的页面
     * index: 当前选项
     * path: 路径集合
     **/
    select(index, path) {
      // 使用事件总线传数据
      this.$bus.$emit('listPath', path)
      console.log(index, path)
      this.$router.push(index)
      // 如果是移动端选择菜单后 菜单收起
      if (this.device === 'mobile') {
        this.$store.dispatch('app/setIsCollapse', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  overflow-x: hidden !important;
  width: 100%;
  border-right: 0;
}
.aside-transition {
  transition: width 0.28s;
}
.iconfont {
  margin-right: 10px;
}
</style>
