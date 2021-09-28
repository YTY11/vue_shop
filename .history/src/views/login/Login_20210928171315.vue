<template>
  <div class="login">
    <div class="login-win">
      <!-- 头像区域 -->
      <div class="login-icon">
        <img src="~@/assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form class="login-form" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="nameRules">
          <el-input
            prefix-icon="iconfont icon-yonghutianchong"
            v-model="userData.userName"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passRules">
          <el-input
            prefix-icon="iconfont icon-ziyuanxhdpi"
            type="password"
            v-model="userData.passWord"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
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
      userData: {
        // 输入的数据
        userName: 'admin',
        passWord: '123456'
      },
      loginFormRules: {
        // 用户名规则
        nameRules: [
          {required:true,error:"用户名不能为空!",trigger: 'blur'},
          {min:3,max:20,error:"yong!",trigger: 'blur'}
        ],
        // 密码规则
        passRules: [{}]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/login/login.scss';
</style>
