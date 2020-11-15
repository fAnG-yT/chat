<template>
<floor>
    <div @click="to(active[0].path)" :class="$route.path===active[0].path?'active':''"><i class="iconfont icon-xiaoxi"></i><span>消息</span></div>
    <div @click="to(active[1].path)" :class="$route.path===active[1].path?'active':''"><i class="iconfont icon-wodehaoyou"></i><span>我的好友</span></div>
    <div @click="to(active[2].path)" :class="$route.path===active[2].path?'active':''"><i class="iconfont icon-tianjiahaoyou"></i><span>添加好友</span></div>
    
</floor>
</template>

<script>
export default {
  name: 'floorNav',
  data () {
    return {
      active:[
        {
          path:'/message',
          // active:false
          },
        {
          path:'/friends',
          // active:false
          },
        {
          path:'/addFriends',
          // active:false
          }
      ],
    }
  },
  created(){
    this.$root.$on('tonext',()=>{
      console.log('on~~~')
        for(var i = 0,n= this.active.length;i<n;i++){
          if(this.active[i].path===this.$route.path){
            i===n-1?this.to(this.active[0].path):this.to(this.active[i+1].path)
          }
        }
    })
  },
  methods:{
      to(path){
        // console.log(this.$route.path)
        // route.active=true
          this.$router.replace({
              path
          })
          
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
floor{
    height: 7vh;
    width: 100vw;
    background:#fff;
    position: fixed;
    display: flex;
    bottom: 0;
}
floor div{
    flex:auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #3d3d3d;
}

.active{
  /* transition: border linear; */
  border:0.5vw solid  ;
  border-color:cadetblue transparent transparent;
  /* border-top: 2vw solid cadetblue; */
}

span{
  font-size: small;
}

.iconfont{
  color: cadetblue;
  font-size: 5vw;
  margin: 0.5vw auto;
}
</style>
