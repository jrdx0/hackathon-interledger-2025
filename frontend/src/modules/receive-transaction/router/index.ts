import type { RouteRecordRaw } from 'vue-router'

export const receiveTransactionRouter: RouteRecordRaw = {
  path: 'receive-transaction',
  name: 'ReceiveTransactionApp',
  component: () => import('@/layouts/LayoutRouterView.vue'),
  redirect: { name: 'ReceiveTransaction' },
  children: [
    {
      path: '',
      name: 'ReceiveTransaction',
      component: () => import('@/modules/receive-transaction/views/ReceiveView.vue'),
    },
    {
      path: 'create',
      name: 'receive-create',
      component: () => import('@/modules/receive-transaction/views/ReceiveCreate.vue'),
    },
    {
      path: 'read/:id',
      name: 'receive-read',
      component: () => import('@/modules/receive-transaction/views/ReceiveRead.vue'),
    },
  ],
}
