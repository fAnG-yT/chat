<!--好友列表-->
<template>
 <div style="overflow:hidden">
     <div style="color:hsl(180, 2%, 54%);font-size:4vw">通讯录</div>
     <div v-for="friend in friendsList" :key="friend.useid"
     class="show" :id="friend"
     @click="chat(friend)"
     @touchstart='showdelete($event)' >
        <img :src="friend.face" alt="">
        <span>{{friend.useName}}</span>
        <div class="delete" ref="del" @click="deleteFriend(friend)"> 删除</div>
     </div>
 </div>
</template>
<script>
import {getFriendsList,deleteF} from '../www/request'
export default {
  name: 'HelloWorld',
  data () {
    return {
        userId:localStorage.getItem('useid'),
        friendsList:[{
            useid: '',
            useName: '',
            sign: '',
            face: '',
            phone: '',
            token: ''
            },
            
        ],
        el:null,//侧滑的元素
        prevent:false,//列表是否侧滑
    }
  },
  created(){
      this.getList(this.userId)
      document.body.addEventListener('click',(e)=>{
        if(this.prevent){
          console.log(e.target.matches(".delete"))
                  this.prevent=false
                  this.el=null
                  
                  e.stopPropagation()
                
      }
                //   return false
              },true)
      document.body.addEventListener('touchstart',(e)=>{
        if(e.target.matches(".delete")){
          this.prevent=false
        }
                // e.preventDefault()
                else if(this.prevent){
                  // this.el.parentNode.style['pointer-events']='auto'
                  this.el.style=null
                  e.stopPropagation()
                }
              })      
     
  },
  methods:{
      showdelete(event){
          var el = event.target,
          x=event.targetTouches[0].clientX,
          maxX=window.getComputedStyle(this.$refs.del[0],null).width.slice(0,-2),
          right,parent
          
          console.log(el)
        //   console.log(this.$refs.del[0])
          el.ontouchmove=(e)=>{
            //   document.preventDefault()
              e.preventDefault()
              right = x-e.changedTouches[0].clientX
              // el.style.position= 'relative'
              el.style.right=(right>0?(right<=maxX?right:maxX):0)+'px'
              console.log(el,e)
          }           

          el.ontouchend=(end)=>{
            // end.preventDefault()
            //   end.stopPropagation()
              if(right>=maxX/2){
                  el.style.right=maxX+'px'
                  this.prevent = true
                  this.el = el
                  // el.parentNode.style['pointer-events']='none'
              }
              else{
                  el.style=null
              }
              
           }
        
       },
      getList(id){
          getFriendsList({id}).then(res=>{
              console.log(res)
              this.friendsList=res.data
          })
      },
      chat(friend){
          // if(!this.prevent){
            this.$router.push({
                path:"/chat",
                query:friend,
                meta:friend
            })
          // }
      },
      deleteFriend(friend){
        console.log("delete")
        deleteF(friend).then((data)=>{
          
              this.friendsList=res.data
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show{
    position: relative;
    display: flex;
    width: 112vw;
    background: #fff;
    height: 15vw;
    border-bottom: 1px #dddddd solid;
}
.show img{
    margin: auto 0 auto 5vw;
    height: 10vw;
    width: 10vw;
    /* border: 0.1vw #ddd solid; */
    border-radius: 2vw;
}
.show span{
    margin: auto auto auto 3vw;
    font-size: 5vw;
}
.show .delete{
    display: flex;
    background-color: tomato;
    height: 15vw;
    width: 12vw;
    margin-right: 0;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 4vw;
}
</style>
