<template>
  <div class="login_container">
    <!-- 登录盒子 -->
    <div class="login_box">
      <h2>证书生成平台</h2>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        class="login_form"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="loginForm.passWord"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="text" @click="registerDialogVisible = true">还没有账号？点击注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册对话框 -->
    <el-dialog title="注册" :visible.sync="registerDialogVisible" class="register_dialog">
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef">
        <el-form-item prop="userName">
          <el-input
            v-model="registerForm.userName"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="registerForm.passWord"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.exclusiveId"
            prefix-icon="el-icon-postcard"
            placeholder="请输入专属ID"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRegisterDialog">取 消</el-button>
        <el-button type="primary" @click="register"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      loginForm: {
        userName: 'admin',
        passWord: '123456',
      },
      registerForm: {
        userName: '',
        passWord: '',
        exclusiveId: ''
      },
      registerDialogVisible: false,
      // 表单校验规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    login() {
      this.$http.post('login', this.loginForm).then(response => {
        const res = response.data
        if(res.code === 200) {
          console.log(res)
          this.$store.dispatch('setManagerId', res.data)
          this.$router.push('/home')
          return this.$message.success(res.msg)
        }
      }).catch(() => {
        console.log('登录失败')
        this.$message.error('登录失败')
      })
    },
    // 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 注册
    register() {
      this.$http.post('/register', this.registerForm).then(response => {
        const res = response.data
        if(res.code === 200) {
          console.log(res)
          this.$store.dispatch('setManagerId', res.data.exclusiveId)
          this.$router.push('/home')
          return this.$message.success(res.msg)
        }
      }).catch(() => {
        console.log('注册失败')
        this.$message.error('注册失败')
      })
    },
    // 关闭注册对话框
    closeRegisterDialog() {
      this.$refs.registerFormRef.resetFields()
    }
  },
  mounted() {},
};
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/Login_background.jpg");
  background-size: 100% 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #c1c0c0;
  border-radius: 20px;
  position: absolute;
  top: 25%;
  left: 35%;
}

.login_form {
  position: absolute;
  bottom: 10%;
  padding: 0 30px;
  width: 100%;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: right;
}

.el-button--text {
  color: #0a0b0a63;
}

</style>
