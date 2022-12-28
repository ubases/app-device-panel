import Vue from 'vue'
import VueRouter from 'vue-router'
import viewsRouter from './views'
import store from '../store/'; 

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [...viewsRouter]
})

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    next()
  }, 150);
})

export default router
