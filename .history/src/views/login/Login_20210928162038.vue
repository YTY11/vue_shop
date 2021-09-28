<template>
  <div class="login">
    <div class="login-win">
      <div class="login-icon">
        <img src="~@/assets/logo.png" alt="" />
      </div>
      <el-form class="login-form">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userData:{
        userName:'admin'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/login/login.scss';
</style>
