<template>
  <div class="login-wrap">
    <div class="login">
      <h3 class="title">用户登录</h3>
      <div>
        <i class="iconfont icon-yonghu"></i>
        <input type="text" v-model="userForm.number" 
        auto-complete="off" 
        placeholder="帐号">
      </div>
      <div>
          <i class="iconfont icon-mima"></i>
          <input type="password" v-model="userForm.password" 
          auto-complete="off" 
          placeholder="密码" 
          >
        </div>
        <button type="info"  @click="toLogin(userForm)"
        :loading="logining">登录</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {login} from '../www/request'
import {socket} from '../www/socket'
export default {
  name: 'login',
  data() {
    return {
      //定义loading默认为false
      logining: false,
      userForm: {
        //username和password默认为空
        number: '',
        password: '',
      },
      //rules前端验证
      rules: {
        number: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // this.$message({
    //   message: '账号密码及验证码不为空即可',
    //   type: 'success'
    // })
    localStorage.clear()
  },
  // 里面的函数只有调用才会执行
  methods: {

    //获取信息
    toLogin(formName) {
        login(formName).then(res=>{
          console.log(res.data[0])
          localStorage.setItem('useid',res.data[0].useid)
          localStorage.setItem('useName',res.data[0].useName)
          localStorage.setItem('face',res.data[0].face)
          socket.emit("login",{id:res.data[0].useid})
          this.$router.push({
            path:'/friends',
          })
          
        }).catch(e=>{})
        // login(formName).then(res=>{
        //     console.log(res.data)
        //     if(res.data.success===false){
        //         throw error
        //     }
        //     else{
        //         this.$store.commit('login',{
        //           loading:true,
        //           user:res.data
        //         })
        //         this.$router.push('/')
        //     }
        // }).catch(()=>{
        //     this.$message({
        //       message:'密码或工号出错啦',
        //       type:'error'
        //     })
        //     this.logining = false
            
        // })
    },
  }
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: cadetblue;
}
.login{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: auto;
  width: 90vw;
  /* padding: 30px 35px 15px 35px; */
  background: #fff;
  border: 1px solid #eaeaea;
  /* text-align: left; */
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.login div{
  margin: 2vw auto;
}
.login div input{
  border: 0.5vw solid;
  border-color: transparent transparent #ddd;
  outline: none ;
  /* outline-color: cadetblue; */
  height: 5vw;
}

.login div input:focus{
  border-color: transparent transparent cadetblue;
  
}

.login button{
  width: 20vw;
  height: 8vw;
  background-color: cadetblue;
  border: none;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  color: #fff;
  margin: 2vw auto;
  outline-color: cadetblue;
}

.title {
  margin:2vw auto;
  text-align: center;
  color: cadetblue;
  
}
.remember {
  margin: 0px 0px 35px 0px;
}
.code-box {
  text-align: right;
}
.codeimg {
  height: 40px;
}

.iconfont{
  color: cadetblue;
  font-size: 5vw;
}
</style>