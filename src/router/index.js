import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkView from '../views/WorkView.vue'
import AdminView from '../views/AdminView.vue'
import AdminUpload from '../views/AdminUpload.vue'
import firebase from "@/firebase/firebase"



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/work',
    name: 'work',
    component: WorkView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/admin_upload',
    name: 'admin_upload',
    component: AdminUpload,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 管理者ログイン時にしかadminを表示させないようなメソッド
router.beforeEach((to, from, next) => {
  // requiresAuthにroutesのrecodeを格納
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // ログインが必要なページであればifに進む
  if (requiresAuth) {
    // ログインチェック。もしされていないならば、adminにリダイレクト
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        next({
          path: '/admin',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
