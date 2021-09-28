<template>
  <div class="login">
    <div class="login-win">
      <!-- 头像区域 -->
      <div class="login-icon">
        <img src="~@/assets/img/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginForm"
        :model="userData"
        class="login-form"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input
            prefix-icon="iconfont icon-yonghutianchong"
            v-model="userData.userName"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passWord">
          <el-input
            prefix-icon="iconfont icon-ziyuanxhdpi"
            type="password"
            v-model="userData.passWord"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="login-button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetField">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 登录fang
export default {
  name: 'Login',
  data() {
    // 用戶名校验
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.toString().length > 20 || value.toString().length < 3) {
        callback(new Error('字符长度在3 ~ 20之间'))
      } else {
        callback()
      }
    }
    // 密码校验
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.toString().length > 30 || value.toString().length < 6) {
        callback(new Error('字符长度在6 ~ 30之间'))
      } else {
        callback()
      }
    }

    return {
      userData: {
        // 输入的数据
        userName: 'admin',
        passWord: '123456'
      },
      loginFormRules: {
        // 用户名规则
        userName: [{ validator: validateName, trigger: 'blur' }],
        // 密码规则
        passWord: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 数据重置
    resetField() {
      this.$refs.loginForm.resetFields()
    },
    // 登录
    login() {
      this.$refs.loginForm.validate((valid) => {
        console.log(this.userData)
        if (valid) {
          this.$router.push('/home')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/login/login.scss';
</style>
