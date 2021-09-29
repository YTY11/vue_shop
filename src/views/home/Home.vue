<template>
  <div class="home">
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
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
