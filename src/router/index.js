import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')  },
  {
    path: '/double-game',
    name: 'Double',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "double" */ '../views/double-game.vue')
  },
  {
    path: '/solo-game',
    name: 'Solo',
    component: () => import(/* webpackChunkName: "solo" */ '../views/solo-game.vue')
  }
]

const router = new VueRouter({
  // mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  mode: 'history',
  routes
})

export default router
