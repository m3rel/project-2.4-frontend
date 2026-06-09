import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import EmployeeDashboard from '@/views/employee/DashboardView.vue'
import CustomerDashboard from '@/views/customer/DashboardView.vue'
import AccountsView from '@/views/employee/AccountsView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
    },
    {
      path: '/employee',
      component: () => import('@/layouts/EmployeeLayout.vue'),
      meta: { requiresAuth: true, role: 'ROLE_EMPLOYEE' },
      children: [
        {
          path: '',
          redirect: { name: 'employeeDashboard' },
        },
        {
          path: 'dashboard',
          name: 'employeeDashboard',
          component: () => import('@/views/employee/DashboardView.vue'),
        },
        {
          path: 'users',
          name: 'employeeUsers',
          component: () => import('@/views/employee/UsersView.vue'),
        },
        {
          path: 'users/pending',
          name: 'employeePendingUsers',
          component: () => import('@/views/employee/PendingApprovalView.vue'),
        },
        {
          path: 'accounts',
          name: 'employeeAccounts',
          component: () => import('@/views/employee/AccountsView.vue'),
        },
        {
          path: '/accounts/:iban',
          name: 'account-details',
          component: () => import('@/views/employee/AccountDetailsView.vue'),
        },
        {
          path: 'transactions',
          name: 'employeeTransactions',
          component: () => import('@/views/employee/TransactionsView.vue'),
        },
      ],
    },
    {
      path: '/customer',
      component: () => import('@/layouts/CustomerLayout.vue'),
      meta: { requiresAuth: true, role: 'ROLE_CUSTOMER' },
      children: [
        {
          path: '',
          redirect: { name: 'customerDashboard' },
        },
        {
          path: 'dashboard',
          name: 'customerDashboard',
          component: () => import('@/views/customer/DashboardView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if ((to.name === 'login' || to.name === 'register') && token) {
    if (role === 'ROLE_EMPLOYEE') return { name: 'employeeDashboard' }
    if (role === 'ROLE_CUSTOMER') return { name: 'customerDashboard' }
  }

  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }

  if (to.meta.role && to.meta.role !== role) {
    return { name: 'login' }
  }
})

export default router
