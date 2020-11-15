<template>
 <div>
     <div v-for="friend in messageList" :key="friend.useid">
         <div class="show" @click="chat(friend)">
             <img :src="friend.face" alt="">
             <div v-show="friend.count?true:false" class="isRead">{{friend.count}}</div>
             <div>
                <span class="name">{{friend.useName}}</span>
                <span class="latestMsg">{{friend.msg}}</span>
             </div>
             <span class="time">{{getTime(friend.time)}}</span>
         </div>
     </div>
 </div>
</template>

<script>
import { socket } from '../www/socket'
import {messageList} from '../www/requestFriends'
export default {
  name: 'HelloWorld',
  data () {
    return {
        userId:localStorage.getItem('useid'),
        messageList:[],
    }
  },
  
  created(){
    this.getMessageList(this.userId)
    //   this.userId=this.$route.query.userId
    //   console.log(this.$router.query.userId)
    // console.log(this.userId)
    socket.on('receive',(data)=>{
      console.log('~~~')
      this.updated(data)
    })
      // this.getList(this.userId)
  },
  methods:{
      getMessageList(id){
          messageList({id}).then(res=>{
              console.log(res)
              this.messageList=res.data
          })
      },
      updated(data){
        for(var i = 0,n=this.messageList.length;i<n;i++){
            if(this.messageList[i].useid == data.fromid){
              this.messageList[i].count++
              this.messageList[i].msg=data.msg
              this.messageList[i].time = data.time
              data = this.messageList[i]
              this.messageList.splice(i,1)
              break
            }
        }  
        this.messageList.unshift(data)
        this.scrollToTop()
        console.log(this.messageList)
      },
      chat(friend){
          this.$router.push({
              path:"/chat",
              query:friend,
              meta:friend
          })
      },
       //滑动到顶部
      scrollToTop(){
          console.log("toTop")
          var el = document.body
        //   var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight
        //   var clientHeight  = document.documentElement.clientHeight||document.body.clientHeight
        //   setTimeout(()=>{
            this.$nextTick(()=>{
                el.scrollTop=0
                // console.log(document.body,window)
              })
      },
       getTime(time){
          //时间差计算
          
          var now = new Date().getTime();
          var a = new Date(parseInt(time));
         
          var b = new Date(parseInt(now));
           console.log(a,b)
          var date1 = Date.parse(this.format(a, 4));
          var date2 = Date.parse(this.format(b, 4));
          var timediff = Math.ceil((date2 - date1) / (60 * 1000))
          if (timediff <= 1 && timediff >= 0) {
              return "刚才";
            } else if (timediff <= 10 && timediff > 1) {
              return timediff + "分钟前";
            } else if (timediff <= 60 && timediff > 10) {
              return this.format(a, 1);
            } else if (timediff <= 1440 && timediff > 60) {
              return this.format(a, 1);
            } else if (timediff <= 10080 && timediff > 1440) {
              return this.format(a, 2);
            } else if (timediff > 10080) {
              return this.format(a, 3);
            } else {
              return this.format(a, 4);
            }
       
    },
      //格式化时间
      format(now, type) {
          var show_day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
          var year = now.getFullYear().toString();
          var month = (now.getMonth() + 1).toString();
          var day = (now.getDate()).toString();
          var tian = now.getDay().toString();
          var hour = (now.getHours()).toString();
          var minute = (now.getMinutes()).toString();
          var second = (now.getSeconds()).toString();
          if (hour.length == 1) {
              hour = "0" + hour;
            }
          if (minute.length == 1) {
              minute = "0" + minute;
            }
          if (second.length == 1) {
              second = "0" + second;
            }
          if (type == 1) {
              var dateTime = hour + ":" + minute+ ":" + second;
            } else if (type == 2) {
              var dateTime = show_day[tian] + " " + hour + ":" + minute;
            } else if (type == 3) {
              var dateTime = month + "/" + day + " " + hour + ":" + minute;//year + "-" + month + "-" + day
            } else if (type == 4) {
              var dateTime = year + "/" + month + "/" + day + " " + hour + ":" + minute;
            } else if (type == 5) {
              var dateTime = show_day[tian];
            }
              return dateTime;
            }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show{
    display: flex;
    /* position: sticky; */
    background: #fff;
    height: 18vw;
    border-bottom: 1px #dddddd solid;
}
.show img{
    margin: auto 0 auto 3vw;
    height: 12vw;
    width: 12vw;
    /* border: 0.1vw #ddd solid; */
    border-radius: 2vw;
}
.show>span{
    margin: 4vw auto auto 3vw;
    font-size: 4vw;
}
.show div{
  display: flex;
  flex-direction: column;
  margin: auto auto auto 3vw;
}
.show .name{
    font-weight: 500;
}
.show .latestMsg{
    /* position:absolute; */
    /* left: 15vw; */
    /* top:7vw; */
    font-size: 3.5vw;
    color: #8f8f8f;
}
.show .isRead{
  /* transform: translateZ(10%); */
  margin: 2vw 0 auto -2vw;
  /* z-index: 100px; */
  display: flex;
  /* top: 3vw; */
  /* left: 10vw; */
  width: 3vw;
  height: 3vw;
  background-color: red;
  border-radius: 2vw;
  color: #fff;
  font-size: 1.5vw;
  justify-content: center;
  align-items: center;
}
.show .time{
  margin-right: 3vw;
  font-size: 3vw;
}
</style>
