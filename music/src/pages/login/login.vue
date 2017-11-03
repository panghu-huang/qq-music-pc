<template>
  <div class="login-wrapper">
    <my-form title="用户登录"
             ref="form"
             :errMsg="errMsg">
      <div class="input-wrap">
        <span><i class="icon-username"></i></span>
        <input type="text"
               class="username"
               v-model="username"
               placeholder="请输入用户名">
      </div>
      <div class="input-wrap">
        <span><i class="icon-password"></i></span>
        <input type="password"
               class="password"
               placeholder="请输入密码"
               v-model="password"
               @keyup.enter="login">
      </div>
      <button class="form-btn" @click="login">登录</button>
      <div class="forget-and-reg">
        <a href="javascript:" @click="$router.push({path: '/forget-pwd'})">忘记密码</a>
        <a href="javascript:" @click="$router.push({path: '/register'})">注册</a>
      </div>
    </my-form>
  </div>
</template>
<style>
  .login-wrapper {
    width: 100%;
    background-color: #31C27C;
    display: flex;
    justify-content: center;
    padding: 80px 0;
  }

  .login-wrapper .forget-and-reg {
    text-align: right;
    font-size: 14px;
    height: 52px;
    line-height: 52px;
  }

  .login-wrapper .forget-and-reg a:first-child {
    margin-right: 4px;
  }
</style>
<script type="text/ecmascript-6">
  import MyForm from '../../components/form/form.vue'
  import axios from 'axios'
  import mutationTypes from '../../store/mutation-types'

  export default{
    data() {
      return {
        errMsg: '',
        username: '',
        password: ''
      }
    },
    watch: {
      username(value) {
        if (value && this.password) {
          this.errMsg = '';
        }
      },
      password(value) {
        if (value && this.username) {
          this.errMsg = '';
        } else {
          if (!this.errMsg)
            this.errMsg = '请填写用户名和密码';
        }
      }
    },
    methods: {
      login() {
        if (this.errMsg && this.errMsg != '抱歉，登录出现错误') {
          this.$refs.form._shake();
          return;
        }
        let username = this.username;
        let password = this.password;
        if (!username || !password) {
          this.errMsg = '请填写用户名和密码';
        } else {
          if (this.errMsg)
            this.errMsg = '';
          axios.post('/users/login', {
            username,
            password
          })
            .then(result => {
              if (result.data.status !== 0) {
                this.errMsg = '抱歉，登录出现错误';
                return;
              }
              if (result.data.data) {
                this.$store.commit(mutationTypes.SET_USER_INFO, result.data.data);
                this.$router.push({
                  path: '/'
                });
              } else {
                this.password = '';
                this.errMsg = '用户名或者密码错误';
              }
            })
            .catch(error => {
              console.log('user login error-->', error);
              this.errMsg = '抱歉，登录出现错误';
            })
        }
      }
    },
    components: {
      MyForm
    }
  }
</script>
