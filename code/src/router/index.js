import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import GxChanNeng from '../components/gx/channeng'
import GxChanLiang from '../components/gx/chanliang'





export default new Router({
  routes: [
    {path:'/',redirect:'/gxcn'},
    {path:'/gxcn',component:GxChanNeng},
    {path:'/gxcl',component:GxChanLiang}
  ]
})
