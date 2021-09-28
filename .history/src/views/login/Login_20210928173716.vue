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
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-yonghutianchong"
            v-model="userData.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-ziyuanxhdpi"
            type="password"
            v-model="userData.password"
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
    // 用戶名校验
    var validateName = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    return {
      userData: {
        // 输入的数据
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 用户名规则
        username: [{ validator: validateName, trigger: 'blur' }],
        // 密码规则
        password: [{}]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/login/login.scss';
</style>
