import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: function () {
      return import('../views/login.vue')
    }
  },
  {
    path: '/role-config',
    name: 'RoleConfig',
    component: function () {
      return import('../views/roleConfig.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../views/login.vue')
    }
  },
  {
    path: '/home',
    name: 'home',
    component: function () {
      return import('../views/home.vue')
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: function () {
      return import('../views/register.vue')
    }
  },
  // 设备管理页面路由
  {
    path: '/device-management',
    name: 'DeviceManagement',
    component: function () {
      return import('../views/DeviceManagement.vue')
    }
  },
  // 添加用户管理路由
  {
    path: '/user-management',
    name: 'UserManagement',
    component: function () {
      return import('../views/UserManagement.vue')
    }
  },
  {
    path: '/model-config',
    name: 'ModelConfig',
    component: function () {
      return import('../views/ModelConfig.vue')
    }
  },
  {
    path: '/test',
    name: 'TestServer',
    component: function () {
      return import('../views/test.vue')
    }
  },

]

const router = new VueRouter({
  routes
})

// 全局处理重复导航，改为刷新页面
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name === 'NavigationDuplicated') {
      // 如果是重复导航，刷新页面
      window.location.reload()
    } else {
      // 其他错误正常抛出
      throw err
    }
  })
}

// 需要登录才能访问的路由
const protectedRoutes = ['home', 'RoleConfig', 'DeviceManagement', 'UserManagement', 'ModelConfig']

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查是否是需要保护的路由
  if (protectedRoutes.includes(to.name)) {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (!token) {
      // 未登录，跳转到登录页
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router
