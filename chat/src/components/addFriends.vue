<!--添加好友界面-->
<template>
<div>
  <!--搜索框-->
  <div class="searchBox">
    <input type="search" name="" id="search" v-model="friends">
    <i class="iconfont icon-linedesign-12" @click="search"></i>
  </div>
  <!--查找后的好友卡片-->
  <div v-if="addFriend" class="show">
      <img :src="addFriend.face" alt="">
          <span>{{addFriend.useName}}</span>
          <button @click="add">添加好友</button>
  </div>
  <!--收到的好友请求列表-->
  <div v-if="friendsAgree.length" style="color:hsl(180, 2%, 54%);font-size:4vw">好友请求</div>
  <div v-for="friend in friendsAgree" :key="friend.useid">
         <div class="show" >
             <img :src="friend.face" alt="">
             <span>{{friend.useName}}</span>
             <button @click="agree(friend)">同意</button>
         </div>
  </div>
  <!--已同意好友请求的列表-->
  <div v-if="newFriends.length" style="color:hsl(180, 2%, 54%);font-size:4vw">新的好友</div>
  <div v-for="friend in newFriends" :key="friend.useid">
         <div class="show" @click="chat(friend)">
             <img :src="friend.face" alt="">
             <span>{{friend.useName}}</span>
             <span style="margin-right:5vw;color:hsl(180, 2%, 54%)">已添加</span>
         </div>
  </div>
</div>
</template>

<script>
import {friendsAgree,newFriends,searchFriends} from '../www/requestFriends'
import {chat} from '../www/request'
import { socket } from '../www/socket'
export default {
  name: 'HelloWorld',
  data () {
    return {
      //用户信息
      user:{
        useid:+localStorage.getItem('useid'),
        face:localStorage.getItem('face'),
        useName:localStorage.getItem('useName')
      },
      newFriends:[],
      friendsAgree:[],
      friends:'',
      addFriend:[],
    }
  },
  created(){
    this.getFriendsAgree(this.user.useid)
    this.getNewFriends(this.user.useid)

    //实时接收好友请求
    socket.on('addFriend',(data)=>{
      this.friendsAgree.push(data)
    })
  },
  methods:{
    getFriendsAgree(id){
      friendsAgree({id}).then(res=>{
        console.log(res.data)
        this.friendsAgree=res.data
      }).catch((e)=>{
        console.log(e)
      })
    },
    getNewFriends(id){
      newFriends({id}).then(res=>{
        console.log(res.data)
        this.newFriends=res.data
      }).catch(e=>{
        console.log(e)
      })
    },
    search(friends){
      searchFriends({id:this.friends}).then((res)=>{
        console.log(res.data)
        this.addFriend=res.data[0]
      }).catch(e=>{
        console.log(e)
      })
    },
    add(){
      //发送好友请求
      socket.emit('addFriend',{to:this.addFriend,from:this.user},(data)=>{
          console.log(data)
      })
      // addFriend(this.addFriend).then((res)=>{
      //   console.log(res.data)
      // }).catch(e=>{
      //   console.log(e)
      // })
    },
    agree(friends){
      // agreeBeFriends(friends).then((res)=>{
        // console.log(res.data)
        //同意好友请求，
        socket.emit('agree',{
          from:friends,
          to:this.user
          })
        //更新页面
        this.getFriendsAgree(this.user.useid)
        this.getNewFriends(this.user.useid)
      // }).catch((e)=>{
      //     console.log(e)
      // })
    },
    chat(friend){
          this.$router.push({
              path:"/chat",
              query:friend
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchBox{
  height: 5vh;
  display: flex;
  background-color:#A0C9C3;
  box-shadow: 0 1vw #ddd;
  align-items: center;
  /* justify-content: s; */
}

.searchBox input{
  height: 6vw;
  border-radius: 5vw;
  border:none;
  margin-left: 6vw;
  width: 80vw;
  outline: none;
  
}
.searchBox i{
  color: #fff;
  margin-left: 2vw;
  font-size: 5vw;
}
.show{
    display: flex;
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
.show span{
    margin: auto auto auto 3vw;
    font-size: 4vw;
}
.show button{
  margin: auto 5vw auto auto;
  border: none;
  background-color: cadetblue;
  width: 16vw;
  height: 8vw;
  font-size: 3vw;
  color: #fff;
}

</style>
