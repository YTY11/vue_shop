<template>
  <el-aside :width="widthNow" class="aside-transition">
    <!-- 菜单栏 -->
    <el-menu
      default-active="3"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="2"> 选项1 </el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavMenu',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['isCollapse']),
    widthNow() {
      return this.isCollapse ? '60px' : '200px'
    }
  },
  methods: {
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
</style>
