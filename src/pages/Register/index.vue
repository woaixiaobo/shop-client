<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 
          <!-- <a href="login.html" target="_blank">登陆</a> -->
          <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="mobile">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <!-- 图片对应的请求跨域是没有问题的,它是普通的http请求,只有ajax跨域才会有问题 -->
        <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->

        <!-- 此时是给当前服务器发送请求,当时当前服务器有以api开头的代理服务器,代理会转发这个请求 -->
        <!-- 点击这个图片时,重新发送获取图片的请求,来更新图片,页面不会刷新 -->
        <img ref="code" src="/api/user/passport/code" alt="code" @click="updateCode">
        <!-- <span class="error-msg">错误提示信息</span> -->
        <a href="javascript:" @click="updateCode">换一个</a>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password2">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isAgree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        mobile:'',  //手机号(登录账号)
        code:'',  //验证码
        password:'',  //密码
        password2:'',  //确认密码
        isAgree:true,  //是否同意协议
      }
    },
    methods: {
      //点击重新获取验证码
      updateCode(){
        //重新指定img的src就会重新发送请求,而且不会刷新页面
        this.$refs.code.src='/api/user/passport/code'
        //如果是移动端的话,必须要求每次的请求都是发生变化的,所以加个时间戳即可
        // this.$refs.code.src='/api/user/passport/code?time=' + Date.now();
      },
      //完成注册
      async register(){
        //取出输入的数据
        const {mobile,code,password,password2,isAgree} = this;
        //进行前台表单验证,如果不符合则不发送注册请求,并提示相关错误
        if(!isAgree){//如果不同意协议,则不通过
          alert('必须同意');
          return;
        }else if(password===''||password!==password2){
          //如果两次输入的密码不一致,或者为空,也不通过
          alert('两次密码必须相同');
          return;
        }
        try {
          //前台验证通过就发生注册请求
          await this.$store.dispatch('register',{mobile,code,password});
          //注册成功并跳转到登录页面
          this.$router.replace('/login')
        } catch (error) {//注册为成功的话,提示错误,在重新更新验证码,并清除验证码输入框
          this.updateCode();
          //清除输入框数据
          this.code='';
          //提示错误信息
          alert(error.message);
        }

      }
    },
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>