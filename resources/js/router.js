import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Login from './post/Login.vue'
import Index from './post/Index.vue'
import Create from './post/Create.vue'
import SystemError from './post/errors/System.vue'
import Post from './post/Post.vue'
import { id } from 'postcss-selector-parser';

Vue.use(VueRouter)

const routes = [
  {
    path: '/500',
    component: SystemError
  },
  {
    path: '/',
    component: Index
  },
  {
    path: '/create',
    component: Create
  },
  {
    path: '/login',
    component: Login,
    beforeEnter (to, from, next){
      if(store.getters['auth/check']){
        next('/')
      }else{
        next()
      }
    }
  },
  {
    path: '/posts/:id',
    component: Post,
    
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router