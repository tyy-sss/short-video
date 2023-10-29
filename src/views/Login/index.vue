<template>
  <div class="background">
    <div class="outerBox">
      <div class="preBox" :class="{toRight:!isMove}">
        <h1 class="welcomeText">欢迎你</h1>
        <h3 class="englishText">welcome to here</h3>
        <div class="image">
          <img src="src/img/img.png" alt="">
        </div>
      </div>
      <div class="registerBox">
        <div class="title">
          注册
        </div>
        <el-form style="margin-right: 100px;" :model="RegisterForm" :rules="RegisterRules" label-width="100px">
          <el-form-item size="large" label="email" prop="email">
            <el-input v-model="RegisterForm.email"></el-input>
          </el-form-item>
          <el-form-item size="large" style="margin-top: 30px;" label="验证码" prop="captcha">
            <el-input style="width: 150px;" v-model="RegisterForm.captcha"></el-input>
            <el-button @click="getCaptcha" ref="captchaButton" style="margin-left: 36px">{{captchaText}}</el-button>
          </el-form-item>
          <el-form-item size="large" style="margin-top: 30px;" label="密码" prop="password">
            <el-input type="password" v-model="RegisterForm.password"></el-input>
          </el-form-item>
          <el-form-item size="large" style="margin-top: 30px;" label="确认密码" prop="ensurePassword">
            <el-input v-model="RegisterForm.ensurePassword"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <span @click="moveRight" style="color: #f56c6c">已经有账号,去登录</span>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" class="loginButton">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    <div class="loginBox">
      <div class="title">
        登录
      </div>
      <el-form style="margin-right: 100px;" :model="LoginRuleForm" :rules="LoginRules" label-width="100px">
        <el-form-item size="large" label="用户" prop="userid">
          <el-input v-model="LoginRuleForm.userid"></el-input>
        </el-form-item>
        <el-form-item size="large" style="margin-top: 30px;" label="密码" prop="password">
          <el-input type="password" v-model="LoginRuleForm.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <span @click="moveLeft" style="color: #f56c6c">没有账号,去注册</span>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" class="loginButton">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {ElMessage} from "element-plus";
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-message.css'
// import md5 from "md5";
// import {useRouter} from 'vue-router'

const captchaText=ref("获取验证码")
const captchaButton=ref(null)
const isMove=ref(0)

//控制 盒子移动
const moveLeft=()=>{
  isMove.value=0;
}
const moveRight=()=>{
  isMove.value=1;
}

const LoginRuleForm=ref({
  userid:"",
  password:""
})

const RegisterForm=ref({
  password:"",
  ensurePassword:"",
  email:"",
  captcha:""
})

const LoginRules={
  userid:[
    {required:true,message:'请输入用户名称',trigger:'blur'}
  ],
  password:[
    {required:true,message:'请输入密码',trigger:'blur'}
  ]
}

const verifyRegisterEmail=(rule,value,callback)=>{
  //验证注册的邮箱号
  const email = RegisterForm.value.email.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(email)) {
    callback(new Error("请输入有效的邮箱地址"))
  } else {
    callback()
  }
}

const verifyRegisterEnsurePwd=(rule,value,callback)=>{
  if(RegisterForm.value.ensurePassword===RegisterForm.value.password)
  {
    callback()
  }
  else
  {
    callback(new Error("确认密码错误"))
  }
}

const RegisterRules={
  email:[
    {required:true,message:'请输入邮箱号',trigger:'blur'},
    {validator:verifyRegisterEmail,trigger: "blur"}
  ],
  password:[
    {required:true,message:'请输入密码',trigger:'blur'}
  ],
  ensurePassword:[
    {required:true,message:"请确认密码",trigger:'blur'},
    {validator:verifyRegisterEnsurePwd,trigger: 'blur'}
  ],
  captcha:[
    {required:true,message:'请输入验证码',trigger:'blur'}
  ]
}

const getCaptcha=()=>{
  if(captchaButton.disabled===true)
  {
    return ;
  }
  captchaButton.disabled=true

  let i=59
  let k=setInterval(()=> {
    captchaText.value = '还剩' + i + '秒'
    i--
    if(i===0)
    {
      clearInterval(k)
      captchaText.value='获取验证码'
      captchaButton.disabled=false
    }
  },1000)

}

const isLogin=ref(1)

const toRegister=()=>{
  isLogin.value=0
}

const toLogin=()=>{
  isLogin.value=1;
}


</script>

<style scoped>
.background
{
  position: absolute;
  height: 100%;
  width: 100%;
  min-width: 1000px;
  top: 0;
  left: 0;
  background: url("@/img/img.png") no-repeat;
  background-size:100% 100%;
}
.outerBox
{
  margin:0 auto;
  margin-top: 200px;
  /*border-radius: 40px;*/
  width: 1000px;
  height: 500px;
  background-color: rgba(75, 81, 95, 0.1);
  box-shadow: 7px 7px 17px rgba(52, 56, 66, 0.5);
  display: flex;
  justify-content: space-evenly;
  overflow: hidden;
}
.loginBox
{
  width: 500px;
  height: 500px;
  background: rgba(255,255,255,0.7);
  flex: 1;
}
.loginButton
{

  width: 400px;
  margin:0 auto;
  /*margin-top: 0;*/
}
.registerBox
{
  width: 500px;
  height: 500px;
  /*transform: translateY(100px);*/
  background: rgba(255,255,255,0.7);
  flex: 1;
}
el-form-item
{
  height: 50px;
}
.title
{
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.loginBox .title
{
  height:200px;
  line-height: 200px;
}
.preBox
{
  position: absolute;
  top:200px;
  width: 500px;
  height: 500px;
  transform: translateX(-50%);
  background: rgba(129, 169, 177);
  z-index: 3;
  transition: 0.5s ease-in-out;
}
.toRight
{
  transform:translateX(50%);
}
.welcomeText
{
  text-align: center;
  line-height: 100px;
  color: #0c3952;
}
.englishText
{
  text-align: center;
  line-height: 50px;
  color: #fff;
}
.image
{
  height: 300px;
  text-align: center;
}
.image img
{
  height: 200px;
  width: 200px;
  margin-top: 30px;
}
.toRight
{
  transform:translateX(50%);
}

</style>