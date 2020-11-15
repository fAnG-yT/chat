import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Friends from '../components/friends'
import Index from '../components/index'
import Chat from '../components/chat'
import Login from '../components/Login'
import AddFriends from '../components/addFriends'
import Message from '../components/message'
// import { component } from 'vue/types/umd'
Vue.use(Router)
var router = new Router({
  mode:'history',
  routes: [
    {
      path:'/login',
      name:"登录",
      component:Login
    }
    ,{
      path: '/',
      name: '',
      component:Index,
      children:[
        {
          path:'',
          redirect:'/friends'
        },
        {
          path:'/friends',
          name:'我的好友',
          component:Friends,
        },
        {
          path:'/message',
          name:'消息列表',
          component:Message
        },
        {
          path:'/addFriends',
          name:'添加好友',
          component:AddFriends
        }
      ]
    },
    {
      path:'/chat',
      name:'聊天界面',
      component:Chat,
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
    localStorage.clear()
  }
  if(!localStorage.getItem("useid")){
    if(to.path!=='/login'){
      next('/login')
    }
    next()
  }
  next()
})

export default router