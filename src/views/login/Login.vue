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
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetField">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 登录接口引入
import { loginFun } from '@/api/login'
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
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 用户名规则
        username: [{ validator: validateName, trigger: 'blur' }],
        // 密码规则
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      redirect: ''
    }
  },
  methods: {
    // 数据重置
    resetField() {
      this.$refs.loginForm.resetFields()
    },
    // 登录
    login() {
      // 显示加载层
      const loading = this.$loading({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$refs.loginForm.validate((valid) => {
        // 数据符合规则，登录判断
        if (valid) {
          this.$store
            .dispatch('user/login', this.userData)
            .then((res) => {
              // 关闭加载层 给出提示
              loading.close()
              this.$message({
                message: res,
                type: 'success'
              })
              this.$router.push('/')
            })
            .catch(() => {
              // 关闭加载层 给出提示
              loading.close()
              this.$message({
                message: '请检查网络',
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/login/login.scss';
</style>
