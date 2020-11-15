<template >
<div  style="overflow:hidden" @touchmove="toGetHistory($event)" >
<nav>
    <i class="iconfont icon-zuojiantou"></i>
    <span>{{$route.query.useName}}</span>
</nav>
<!--聊天对话-->
<div class="container"  >
    <div class="showmsg" v-for="msg in allMessage" :key="msg.time">
        <div :class="[msg.fromid==user.useid?myContent:yourContent]">
            <img :src="msg.fromid==user.useid?user.face:friend.face" alt="">
            <div class="point"></div>
            <div class="content">{{msg.msg}}</div>
            <i class="iconfont" :class="msg.fromid==user.useid?msg.msgStatus:''"></i>
        </div>
    </div>
</div>
<!--输入框-->
<floor>
    <img class="voide" src="../assets/rec.png">
    <textarea ref='input' v-model="message" @focus="scrollToBottom"  @input="autoHeight"/>
    <img class="emotion"  src="../assets/face1.png">
    <button v-if="message.length" @click="send()">发送</button>
    <img v-else class="extra" src="../assets/add1.png" alt="">
</floor>
<!-- <div class="extraArea">
    <div v-if="emotion" >
        
    </div>
</div> -->
</div>
</template>

<script>
import {socket} from '../www/socket'
import {getHistoryList} from '../www/request'
export default {
  name: 'HelloWorld',
  data () {
    return {
        //聊天消息
        allMessage:[],
        //输入框消息
        message:'',
        //用户信息
        user:{
            useid:localStorage.getItem('useid'),
            useName:localStorage.getItem('useName'),
            face:localStorage.getItem('face')
        },
        myContent:'myClass',
        yourContent:"yourClass",
        //对方好友信息
        friend:{},
        //获取聊天记录最旧的聊天id
        chatid:'',
        wait:false,
        //消息的发送状态
        msgStatus:{
            loading:'icon-jiazai',
            unload:'icon-cuowu',
            static:''
        },
        
    }
  },
  created(){
    // console.log(window.navigator.onLine)
    // window.addEventListener('online',()=>{
    //     console.log("联网成功！！")
    // })
    // window.addEventListener('offline',()=>{
    //     console.log('断网啦')
    // })
    //好友信息
    this.friend=this.$route.query
    //   console.log(this.friendface)
    this.getHistory().then(this.scrollToBottom)
    // console.log('created')
  },
  mounted(){
      //接收数据
      socket.on('receive',(data)=>{
        console.log(data)
        this.allMessage.push(data) 
        this.scrollToBottom()
    })
      
    //   console.log("mounted~")
    //   this.scrollToBottom()
  },
  
  beforeDestroy(){
    //   socket.on('receive',null)
    //   console.log('beforDestroy')
      //退出界面前，将消息设置为已读
      this.read({toid:+this.user.useid,fromid:+this.friend.useid})
  },
//   updated(){
//       window.scrollTop = window.scrollHeight
//   },
  methods:{
      //已读
      read(data){
          console.log(data)
          socket.emit('read',data)
      },

      //发送消息
      send(){
          if(this.message.length){
              var msg={}
              msg.msg=this.message//消息内容
              msg.fromid=+this.user.useid//发送方
              msg.toid=+this.friend.useid//接收方
              msg.time=new Date().getTime()
              msg.msgStatus=this.msgStatus.loading
              this.allMessage.push(msg)
              //半分钟仍未收到反馈，则修改信息状态为未发送
              var timer=setTimeout(()=>{
                  msg.msgStatus=this.msgStatus.unload
              },30000)
              //
              socket.emit("send",msg,()=>{
                  //若服务器接收到信息，则会执行该回调函数，修改消息状态
                  msg.msgStatus=this.msgStatus.static
                  clearTimeout(timer)
              })
              
              this.message=''
              this.scrollToBottom()
            //   setTimeout(this.scrollToBottom,)
          }
      },

        //下拉加载历史记录
       toGetHistory(e){ 
        //    console.log(this.wait,Boolean(!this.wait&&document.documentElement.scrollTop<=0))
          if(!this.wait&&document.documentElement.scrollTop<=0){
             this.wait=true
            //  console.log(this.wait)
              if(e.changedTouches[0].clientY>0){
                    // console.log(e,e.changedTouches[0].clientY)
                    this.getHistory(this.chatid).then(()=>{this.wait=false}).catch(e=>{
                        this.wait=true
                        console.log("没有消息啦")
                    })
              }
            //   console.log(this.wait)
          }
          
      },

      //获取历史记录
      getHistory(id){
          var data = {
              id,
              useid:this.user.useid,
              friendid:this.$route.query.useid
          }
          return    getHistoryList(data).then((res)=>{
                        console.log(res.data)
                        this.allMessage.unshift(...res.data)
                        
                        if(res.data.length>0){
                            this.chatid = res.data[0].id 
                        }
                        else{
                            throw 'fail'
                        }
                    })
      },

      //滑动到底部
      scrollToBottom(){
          console.log("tobottom")
          var el = document.body
        //   var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight
        //   var clientHeight  = document.documentElement.clientHeight||document.body.clientHeight
        //   setTimeout(()=>{
            this.$nextTick(()=>{
                el.scrollTop=el.scrollHeight
                // console.log(document.body,window)
              })
      },
      autoHeight(){
        //   this.$refs.input.height=this.$refs.input.value.match(/\\n/g).length*8+'vw'
          console.log(this.$refs.input.style.height,this.$refs.input.value)
      }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* nav{
    position: fixed;
} */

nav{
    position: fixed;
    display:flex;
    height:7vh;
    width: 100vw;
    background: cadetblue;
    /* align-items: center; */
    /* justify-content: center; */
    color: #fff;
    /* vertical-align:middle;
    text-align: center; */
    overflow: hidden;
}
nav span{
    position: absolute;;
    font-size:5vw;
    /* width: 100vw; */
    /* margin: auto; */
    display: block;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
}
.container{
    margin-top: 7vh;
    margin-bottom: 8vh;
}
floor{
    background-color: #fff;
    position: fixed;
    bottom: 0vh;
    display: flex;
    justify-content: space-around;
    height: 12vw;
    width: 100vw;
    align-items: center;
}
floor textarea{
    /* flex: 1; */
    width: 60vw;
    height: 8vw;
    border: none;
    word-break: break-all;

}
floor textarea:focus{
    outline-color: cadetblue;
    /* border: none; */
}
floor img{
    width: 8vw;
    height: 8vw;
}
floor button{
    height: 8vw;
    width: 15vw;
    font-size: 3.5vw;
    border:none;
    background-color: cadetblue;
    color:#fff;
}

.myClass img{
    width: 10vw;
    height: 10vw;
    border-radius: 2vw;
}

.myClass .point{
    width: 0vw;
    height: 0vw;
    border: 1.5vw solid;
    margin-top: 3vw;
    border-color: transparent transparent transparent #A0C9C3;
}
.myClass .content{
    padding: 2vw;
    border-radius: 2vw;
    background-color: #A0C9C3;
    max-width: 60vw;
    word-wrap:break-word;
}
.myClass{
    margin: 4vh 1.5vw;
    display: flex;
    flex-direction: row-reverse;
}
.yourClass img{
    width: 10vw;
    height: 10vw;
    border-radius: 2vw;
}
.yourClass .point{
    width: 0vw;
    height: 0vw;
    border: 1.5vw solid;
    margin-top: 3vw;
    border-color: transparent #fff transparent transparent ;
}
.yourClass .content{
    padding: 2vw;
    border-radius: 2vw;
    background-color: #fff;
    max-width: 60vw;
    word-wrap:break-word;
}
.yourClass{
    margin: 4vh 1.5vw;
    display: flex;
    flex-direction: row;
}
nav i{
    
    /* float:left; */
    margin: auto 2vw;
    font-size: 5vw;
}

.icon-jiazai{
    margin:auto 2vw auto;
    font-size: 4vw;
    animation: circle infinite 1.5s linear;
}

.icon-cuowu{
    margin: auto 2vw auto;
    font-size: 3vw;
    color:rgba(255, 0, 0, 0.315)
}

@keyframes circle {
    
    to{
        transform: rotateZ(1turn);
    }
}
</style>
