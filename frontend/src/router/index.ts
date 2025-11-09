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
      path: '/party/invitation/:id',
      name: 'Invitation',
      component: () => import('@/components/InvitationParty.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/layouts/LayoutRouterView.vue'),
      redirect: { name: 'ReceiveTransactionApp' },
      children: [receiveTransactionRouter, transferTransactionRouter],
    },
  ],
})
