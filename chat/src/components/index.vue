<template>
<div style="overflow:hidden">
<nav>
  <i class="iconfont icon-zuojiantou"></i>
  {{$route.name}}
  <i class="iconfont icon-caidan"></i>
</nav>
<div class="container" ref="main" >
  <!-- <keep-alive> -->
    <router-view ></router-view>
  <!-- </keep-alive> -->
</div>
<floorNav></floorNav>
</div>
</template>

<script>
import floorNav from './floorNav.vue'
import { newFriends } from '../www/requestFriends'
export default {
  name: 'HelloWorld',
  components:{floorNav},
  data () {
    return {
        title:'好友列表',
    }
  },
  created(){
    // this.$refs.main.addEventListener('touchmove',(e)=>{
      
    //   if(e.changedTouches[0].clientX>200){

    //     console.log(e.changedTouches)
    //       this.$emit('tonext')
    //     }
    // })
   
    
  },
  mounted(){
    //  this.$refs.main.addEventListener('touchstart',(e1)=>{
    //   var oldl = e1.targetTouches[0].clientX,newl = oldl
    //   console.log(e1)
    //   this.$refs.main.addEventListener('touchmove',(e)=>{
    //     newl = e.targetTouches[0].clientX
         
    // })
    //   this.$refs.main.addEventListener('touchend',(even)=>{
    //       console.log(even)
    //       if(Math.abs(newl-oldl)>200){
    //       // console.log(e)
    //               newl=oldl
    //               this.$root.$emit('tonext')
    //           } 
    //           else{
    //             // even.preventDefault()
    //           }
    //           // return null
    //     })
    // })
  },
  methods:{
    getTitle(e){
      this.title=e
    },
    to(e){
      console.log(e)
        if(e.changedTouches[0].clientX>10){
          this.$emit('to')
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav{
    z-index:100 ;
    position: fixed;
    display: flex;
    height:7vh;
    width: 100vw;
    background-color:cadetblue;
    align-items: center;
    justify-content: space-between;
    color: #fff;
}
nav i{
  margin: auto 2vw;
}
.container{
    height:100vh;
    margin-top: 7vh;
    font-size: 5vw;
}
</style>
