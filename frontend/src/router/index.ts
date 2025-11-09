import { createRouter, createWebHashHistory } from 'vue-router'
import { receiveTransactionRouter } from '@/modules/receive-transaction/router'
import { transferTransactionRouter } from '@/modules/transfer-transaction/router'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/modules/auth/views/AuthView.vue'),
    },
    // {
    //   path: '/',
    //   name: 'LogOut',
    //   component: () => import('@/pages/LogOut.vue'),
    // },
    // App routes
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      redirect: { name: 'ReceiveTransactionApp' },
      children: [receiveTransactionRouter, transferTransactionRouter],
    },
  ],
})
