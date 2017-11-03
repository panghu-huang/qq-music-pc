<template>
  <div class="form">
    <h2 class="form-title" v-text="title"></h2>
    <div class="form-con">
      <div class="error-wrap"
           :class="{'shake':shake}"
           v-show="errMsg">
          <span class="icon-jinzhi">
          </span>
        <span class="error-msg" v-text="errMsg"></span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<style>
  .form {
    background-color: #ffffff;
    width: 400px;
  }

  .form .form-con {
    width: 78%;
    margin-left: 11%;
  }

  .form .form-title {
    font-size: 20px;
    display: inline-block;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-bottom: 1px solid #dddddd;
    color: #656565;
  }

  .form .input-wrap {
    display: flex;
    border: 1px solid #d6d6d6;
    margin: 20px 0;
  }

  .form .input-wrap span {
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: #d6d6d6;
  }

  .form .input-wrap span i {
    font-size: 18px;
    color: #929292;
  }

  .form input {
    flex: 1;
    outline: none;
    border: none;
    padding-left: 8px;
  }

  .form .error-wrap {
    margin-top: 12px;
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    border: 1px solid #fa3027;
    background-color: rgba(250, 48, 39, 0.12);
    font-size: 13px;
  }

  .form .icon-jinzhi {
    margin: 8px;
  }

  .form .error-msg {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    color: #fa3027;
  }

  .form .form-btn {
    width: 100%;
    height: 40px;
    outline: none;
    color: #ffffff;
    background-color: #25915d;
    border: none;
    font-size: 16px;
    letter-spacing: 4px;
  }

  .form .form-btn:hover {
    background-color: #2eb675;
    cursor: pointer;
  }

  .shake {
    animation: shake-anim .4s;
  }

  @keyframes shake-anim {
    30% {
      transform: translateX(-6px);
    }
    70% {
      transform: translateX(6px);
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      title: {
        Type: String,
        default: ''
      },
      errMsg: {
        Type: String,
        default: ''
      }
    },
    data() {
      return {
        shake: false
      }
    },
    methods: {
      _shake() {
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 400)
      }
    }
  }
</script>
