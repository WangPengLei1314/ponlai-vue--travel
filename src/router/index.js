import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import TypeList from '@/components/typelist'
import Detail from '@/components/detail'
import City from '@/components/city'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/',
  		name:'Home',
  		component: Home
  	},
    {
      path: '/city',
      name: 'City',
      component:City

    },
    {
      path: '/typelist',
      name:'TypeList',
      component: TypeList
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component:Detail

    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


