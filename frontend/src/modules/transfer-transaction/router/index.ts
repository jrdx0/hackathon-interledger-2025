import type { RouteRecordRaw } from 'vue-router'

export const transferTransactionRouter: RouteRecordRaw = {
  path: 'transfer-transaction',
  name: 'TransferTransactionApp',
  component: () => import('@/layouts/LayoutRouterView.vue'),
  children: [
    {
      path: '',
      name: 'TransferTransaction',
      component: () => import('@/modules/transfer-transaction/views/TransferView.vue'),
    },
    {
      path: 'read/:id',
      name: 'TransferTransactionRead',
      component: () => import('@/modules/transfer-transaction/views/TransferRead.vue'),
    },
  ],
}
