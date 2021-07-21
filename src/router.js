import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)
const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/LoginComponent'),
    meta: { guest: true },
  },
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    meta: { requiresAuth: true },
    children: [
      // Dashboard
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/dashboard/Dashboard'),
        meta: { requiresAuth: true },
      },
      // Transactions
      {
        name: 'Dashboard',
        path: 'transactions',
        component: () => import('@/views/Transactions'),
        meta: { requiresAuth: true },
      },
      // Pages
      {
        name: 'User Profile',
        path: 'pages/user',
        component: () => import('@/views/dashboard/pages/UserProfile'),
        meta: { requiresAuth: true },
      },
      {
        name: 'Notifications',
        path: 'components/notifications',
        component: () => import('@/views/dashboard/component/Notifications'),
        meta: { requiresAuth: true },
      },
      {
        name: 'Icons',
        path: 'components/icons',
        component: () => import('@/views/dashboard/component/Icons'),
        meta: { requiresAuth: true },
      },
      {
        name: 'Typography',
        path: 'components/typography',
        component: () => import('@/views/dashboard/component/Typography'),
        meta: { requiresAuth: true },
      },
      // Tables
      {
        name: 'Regular Tables',
        path: 'tables/regular-tables',
        component: () => import('@/views/dashboard/tables/RegularTables'),
        meta: { requiresAuth: true },
      },
      // Maps
      {
        name: 'Google Maps',
        path: 'maps/google-maps',
        component: () => import('@/views/dashboard/maps/GoogleMaps'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next('/')
      return
    }
    next()
  } else {
    next()
  }
})

export default router
