import type { RouteRecordRaw } from 'vue-router'

export const transferTransactionRouter: RouteRecordRaw = {
  path: 'transfer-transaction',
  name: 'TransferTransactionApp',
  component: () => import('@/modules/transfer-transaction/views/TransferView.vue'),
}
