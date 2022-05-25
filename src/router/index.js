import { createRouter, createWebHashHistory } from 'vue-router'
//import Home from '../views/Home.vue'

const routes = [
  {
    path: "/login",
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: "/register",
    name: 'Register',
    component: () => import('../views/user/Register.vue')
  },
  {
    path: "/reset",
    name: 'Reset',
    component: () => import('../views/user/Reset.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/user/home',
    name: 'User_Home',
    component: () => import('../views/user/Home.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/user/Home.vue')
    //component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
