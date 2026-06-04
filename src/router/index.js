import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import EmployeeDashboard from '@/views/employee/DashboardView.vue'
import CustomerDashboard from '@/views/customer/DashboardView.vue'
import AccountsView from '@/views/accounts/AccountsView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', //default route goes to login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
    path: '/employee/dashboard',
    name: 'employeeDashboard',
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: 'ROLE_EMPLOYEE' }
},
    {
      path: '/dashboard',
      name: 'customerDashboard',
      component: CustomerDashboard,
      meta: { requiresAuth: true, role: 'ROLE_CUSTOMER' }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/accounts/:iban',
      name: 'account-details',
      component: () => import('@/views/accounts/AccountDetailsView.vue')
    }
  ],
})

// navigation guard - redirect to login if not authenticated
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // already logged in → don't show login/register
  if ((to.name === 'login' || to.name === 'register') && token) {
    if (role === 'ROLE_EMPLOYEE') return '/employee/dashboard'
    if (role === 'ROLE_CUSTOMER') return '/customer/dashboard'
  }

  // needs auth but no token → go to login
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  // wrong role → go to login
  if (to.meta.role && to.meta.role !== role) {
    return '/login'
  }
})

export default router
