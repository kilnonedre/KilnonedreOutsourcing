import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    name: 'Main',
    path: '/',
    redirect: '/arrearage',
    component: () => import('@/pages/Main.vue'),
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/pages/cloudBoss/Basic.vue'),
        meta: {
          parent: '云BOSS',
          role: ['管理员', '站长']
        },
      },
      {
        path: 'daily',
        name: 'Daily',
        component: () => import('@/pages/cloudBoss/Daily.vue'),
        meta: {
          parent: '云BOSS',
          role: ['管理员', '站长']
        },
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/pages/cloudBoss/History.vue'),
        meta: {
          parent: '云BOSS',
          role: ['管理员', '站长']
        },
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/pages/cloudBoss/Report.vue'),
        meta: {
          parent: '云BOSS',
          role: ['管理员', '站长']
        },
      },
      {
        path: '/OrderAnalysis',
        name: 'OrderAnalysis',
        component: () => import('@/pages/analysis/OrderAnalysis.vue'),
        meta: {
          parent: '用户行为分析',
          role: ['管理员', '站长']
        },
      },
      {
        path: '/APPAnalysis',
        name: 'APPAnalysis',
        component: () => import('@/pages/analysis/TVAnalysis.vue'),
        meta: {
          parent: '用户行为分析',
          role: ['管理员', '站长']
        },
      },
      {
        path: '/WriteoffAnalysis',
        name: 'WriteoffAnalysis',
        component: () => import('@/pages/analysis/WriteoffAnalysis.vue'),
        meta: {
          parent: '用户行为分析',
          role: ['管理员', '站长']
        },
      },
      {
        path: '/LostAnalysis',
        name: 'LostAnalysis',
        component: () => import('@/pages/analysis/LostAnalysis.vue'),
        meta: {
          parent: '用户行为分析',
          role: ['管理员', '站长']
        },
      },
      {
        path: '/Lanmu',
        name: 'Lanmu',
        component: () => import('@/pages/media/Lanmu.vue'),
        meta: {
          parent: '新媒体运营分析',
          role: ['管理员']
        },
      },
      {
        path: '/Toufang',
        name: 'Toufang',
        component: () => import('@/pages/media/Toufang.vue'),
        meta: {
          parent: '新媒体运营分析',
          role: ['管理员']
        },
      },
      {
        path: 'annual',
        name: 'Annual',
        component: () => import('@/pages/cloudBoss/AnnualReport.vue'),
        meta: {
          parent: '手动设置',
          role: ['管理员', '站长']
        },
      },
      {
        path: 'country',
        name: 'Country',
        component: () => import('@/pages/manualSetting/Country.vue'),
        meta: {
          parent: '手动设置',
          role: ['管理员', '站长']
        },
      },
      {
        path: '/arrearage',
        name: 'Arrearage',
        component: () => import('@/pages/detail/Arrearage.vue'),
        meta: {
          role: ['管理员', '站长', '网格员',],
          parent: '明细查询',
        },
      },
      {
        path: '/television',
        name: 'Television',
        component: () => import('@/pages/detail/Television.vue'),
        meta: {
          parent: '明细查询',
          role: ['管理员', '站长', '网格员',]
        },
      },
      {
        path: '/broadband',
        name: 'Broadband',
        component: () => import('@/pages/detail/Broadband.vue'),
        meta: {
          parent: '明细查询',
          role: ['管理员', '站长', '网格员',]
        },
      },
      {
        path: '/install',
        name: 'Install',
        component: () => import('@/pages/detail/Install.vue'),
        meta: {
          parent: '明细查询',
          role: ['管理员', '站长', '网格员',]
        },
      },
      {
        path: '/repair',
        name: 'Repair',
        component: () => import('@/pages/detail/Repair.vue'),
        meta: {
          parent: '明细查询',
          role: ['管理员', '站长', '网格员',]
        },
      },
      {
        path: '/once',
        name: 'Once',
        component: () => import('@/pages/detail/Once.vue'),
        meta: {
          parent: '明细查询',
          role: ['管理员', '站长']
        },
      },
      {
        path: '/ArrearageSubscribe',
        name: 'ArrearageSubscribe',
        component: () => import('@/pages/subscribe/ArrearageSubscribe.vue'),
        meta: {
          parent: '消息订阅',
          role: ['管理员']
        },
      },
      {
        path: '/TVSubscribe',
        name: 'TVSubscribe',
        component: () => import('@/pages/subscribe/TelevisionSubscribe.vue'),
        meta: {
          parent: '消息订阅',
          role: ['管理员']
        },
      },
      {
        path: '/FDDISubscribe',
        name: 'FDDISubscribe',
        component: () => import('@/pages/subscribe/BroadbandSubscribe.vue'),
        meta: {
          parent: '消息订阅',
          role: ['管理员']
        },
      },
      {
        path: '/UserManage',
        name: 'UserManage',
        component: () => import('@/pages/user/UserManage.vue'),
        meta: {
          parent: '平台管理',
          role: ['系统管理者']
        },
      },
      {
        path: '/LoginLog',
        name: 'LoginLog',
        component: () => import('@/pages/user/LoginLog.vue'),
        meta: {
          parent: '平台管理',
          role: ['系统管理者']
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: routes,
})

// 权限校验，登录后才可访问
router.beforeEach((to, from, next) => {
  const token = Cookies.get('user')
  if (to.path == '/login') {
    next()
  } else {
    if (token) {
      if(JSON.parse(token).grade || JSON.parse(token).role) {
        if(to.meta.role.includes(JSON.parse(token).grade) || to.meta.role.includes(JSON.parse(token).role)) {
          next()
        } else {
          ElMessage.warning('没有权限！')
        }
      } else {
        ElMessage.warning('没有权限！')
      }
    } else {
      ElMessage.warning('请先登录再进行操作！')
      next({ path: '/login' })
    }
  }
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
