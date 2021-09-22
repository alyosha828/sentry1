import Vue from 'vue'
import VueRouter from 'vue-router'
import Projects from '../views/Projects.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/projects',
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/issues',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/release',
    name: 'Release',
    component: () => import(/* webpackChunkName: "about" */ '../views/Release.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
