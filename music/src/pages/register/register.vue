<template>
  <div class="register-wrapper">
    <my-form title="用户注册" :errMsg="errMsg" ref="form">
      <div class="input-wrap">
        <span>
          <i class="icon-username"></i>
        </span>
        <input type="text" v-model="username" placeholder="请输入用户名">
      </div>
      <div class="input-wrap">
        <span>
          <i class="icon-password"></i>
        </span>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <div class="input-wrap">
        <span>
          <i class="icon-username"></i>
        </span>
        <input type="tel" v-model="phone" placeholder="请输入手机号码">
      </div>
      <div class="input-wrap">
        <span>
          <i class="icon-username"></i>
        </span>
        <input type="text" v-model="question" placeholder="请输入密码提示问题">
      </div>
      <div class="input-wrap">
        <span>
          <i class="icon-password"></i>
        </span>
        <input type="text" v-model="answer" placeholder="请输入密码提示答案">
      </div>
      <button class="form-btn" @click="register">注册</button>
      <a href="javascript:"
         class="to-login"
         @click="$router.push({path: '/login'})">
        已有账号?去登录>>></a>
    </my-form>
  </div>
</template>
<style>
  .register-wrapper {
    width: 100%;
    padding: 50px 0;
    background-color: #31C27C;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form {
    text-align: right;
  }

  .register-wrapper .to-login {
    font-size: 14px;
    height: 52px;
    line-height: 52px;
  }
</style>
<script type="text/ecmascript-6">
  import MyForm from '../../components/form/form.vue'
  import {debounce} from '../../common/js/util'
  import axios from 'axios'

  export default{
    data() {
      return {
        errMsg: '',
        username: '',
        password: '',
        phone: '',
        question: '',
        answer: ''
      }
    },
    mounted() {
      this.$watch('username', debounce((value) => {
        if (!value) {
          this.errMsg = '请输入用户名';
          return;
        }
        axios.post('/users/checkUser', {
          username: value
        })
          .then(result => {
            if (result.data.status === 0) {
              if (result.data.data) {
                this.errMsg = '用户已存在';
              } else {
                if (this.errMsg)
                  this.errMsg = '';
              }
            }
            console.log(result.data);
          })
          .catch(err => {
            console.log('check user error-->', err);
          })
      }, 500))
    },
    methods: {
      register() {
        if (this.errMsg) {
          this.$refs.form._shake();
          return;
        }
        let username = this.username;
        let password = this.password;
        let phone = this.phone;
        let question = this.question;
        let answer = this.answer;
        if (!username || !password || !phone || !question || !answer) {
          this.errMsg = '请输入完整的注册信息';
        } else {
          axios.post('/users/register', {
            username, password, phone, question, answer
          })
            .then(result => {
              console.log(result.data);
              if (result.data.status === 0) {
                alert('success')
              } else {
                this.errMsg = result.data.msg;
              }
            })
            .catch(error => {
              console.log('user register error-->', error)
            })
        }
      }
    },
    components: {
      MyForm
    }
  }
</script>
