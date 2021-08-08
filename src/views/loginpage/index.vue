<template>
  <div class="login-container">
    <el-form
      class="form-container"
      ref="login-form"
      :model="form"
      :rules="rules"
    >
      <el-form-item class="logo">
        <img class="logo-bg" src="./toutiao-logo.jpg" alt="" />
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="form.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="password"
          v-model="form.code"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="form.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>

      <el-form-item>
        <el-button
          class="form-btn"
          type="primary"
          :loading="loginloading"
          @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/login.js'
import request from '@/utils/request.js'
export default {
  name: 'loginpage',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === false) {
        return callback(new Error('请打勾'))
      } else {
        return callback()
      }
      // console.log(value)
      // callback(new Error('请打勾'))
    }
    return {
      form: {
        mobile: '',
        code: '',
        agree: false,
      },
      checked: false,
      loginloading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { min: 11, max: 11, message: '手机号格式不正确', trigger: 'change' },
        ],
        code: [{ required: true, message: '请输入密码', trigger: 'change' }],
        agree: [
          {
            validator: validatePass,
            // message: '请至少选择一个活动性质',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs['login-form'].validate((valid) => {
        if (valid) {
          const user = this.form
          // console.log('submit!')
          this.loginloading = !this.loginloading
          login(user)
            .then((res) => {
              this.loginloading = !this.loginloading
              console.log(res)
            })
            .catch((err) => {
              this.loginloading = !this.loginloading
              this.$message({
                message: '登录失败',
                type: 'warning',
              })
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })

      // request({
      //   method: 'POST',
      //   url: '/mp/v1_0/authorizations',
      //   data: user,
      // }).then((res) => {
      //   console.log(res)
      // })
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./login-bg.jpg') no-repeat;
  background-size: contain;
  background-position: center;
  .form-container {
    background-color: #fff;
    border-radius: 10px;
    // height: 250px;
    padding: 50px;
    width: 300px;
    // padding: 20px;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    .logo {
      display: flex;
      justify-content: center;
      .logo-bg {
        width: 200px;
        height: 100px;
      }
    }

    .form-btn {
      width: 100%;
    }
  }
}
</style>
