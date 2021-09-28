<template>
  <div class="login">
      <div class="login-win">
        <div class="login-icon">
          <img src="~@/assets/logo.png" alt="">
        </div>
        <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
      </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/style/login/login.scss';
</style>
