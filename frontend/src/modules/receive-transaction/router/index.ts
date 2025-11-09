import type { RouteRecordRaw } from 'vue-router'

export const receiveTransactionRouter: RouteRecordRaw = {
  path: 'receive-transaction',
  name: 'ReceiveTransactionApp',
  component: () => import('@/modules/receive-transaction/views/ReceiveView.vue'),
}
