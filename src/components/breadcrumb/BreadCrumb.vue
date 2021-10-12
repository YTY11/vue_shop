<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in listPath" :key="index">
      <span v-if="index == listPath.length - 1" class="active-span">
        {{ item.meta.title }}</span
      >
      <a class="active-a" v-else @click="goNewPage(item)">
        {{ item.meta.title }}</a
      >
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  created() {
    this.routePaths()
  },
  data() {
    return {
      paths: null,
      listPath: []
    }
  },
  watch: {
    $route() {
      this.routePaths()
    }
  },
  methods: {
    // 获取面包屑数据
    routePaths() {
      const path = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      if (path[0].path !== '/home') {
        this.listPath = [{ path: '/home', meta: { title: '首页' } }].concat(
          path
        )
      } else {
        this.listPath = path
      }
      if (path[1] && path[1].path === '/goods/addGoods') {
        this.listPath.splice(2, 0, { path: '/goods', meta: { title: '商品列表' } })
      }
    },
    // 跳转新页面
    goNewPage(item) {
      const { path } = item
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.active-span {
  color: #aeaeae;
}
.active-a {
  &:hover {
    cursor: pointer !important;
    color: #4784f7 !important;
  }
}
</style>
