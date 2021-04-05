import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Err from '@/components/Err'
import Succ from '@/components/Succ'
import Register from '../components/Register'
import ClassList from '../components/ClassList'
import Mybook from '../components/mybook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Err',
      name: 'Err',
      component: Err
    },
    {
      path: '/Succ',
      name: 'Succ',
      component: Succ
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/classList',
      name: 'ClassList',
      component: ClassList
    },
    {
      path: '/Mybook',
      name: 'Mybook',
      component: Mybook
    }
  ]
})
