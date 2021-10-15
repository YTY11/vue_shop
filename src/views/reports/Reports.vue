<template>
  <dv-full-screen-container class="bg">
    <!-- 头部 -->
    <HeadView class="header"/>
    <el-row class="row" v-if="device">
      <el-col :span="6">
        <!-- 左侧 -->
        <Left />
      </el-col>
      <el-col :span="12">
        <!-- 中间 -->
        <Center />
      </el-col>
      <el-col :span="6">
        <!-- 右侧 -->
        <Right />
      </el-col>
    </el-row>
    <el-row class="row mobile-row">
      <Earth/>
    </el-row>
  </dv-full-screen-container>
</template>

<script>
import Earth from './childComps/Earth.vue'
// 模式切换
import ResizeHander from '@/layout/mixin/resizeHander'
// 头部组件
import HeadView from './childComps/HeadView.vue'
// 左侧组件
import Left from './childComps/Left.vue'
// 中间组件
import Center from './childComps/Center.vue'
// 右侧组件
import Right from './childComps/Right.vue'
export default {
  name: 'Reports',
  components: {
    HeadView,
    Left,
    Center,
    Right,
    Earth
  },
  mixins: [ResizeHander],
  computed: {
    // 判断是否为移动端
    device() {
      console.log(this.$store)
      return this.$store.state.app.device === 'desktop'
    }
  }
}
</script>

<style lang="scss" scoped>
.bg{
  background: url('~@/assets/img/bg.png') no-repeat;
  background-size: cover;
  background-position: center;
}
.header{
  height: 10vh;
}
.row{
  height: 90vh;
  .el-col{
    height: 100%;
  }
}
.mobile-row{
  padding: 20px 0;
}
</style>
