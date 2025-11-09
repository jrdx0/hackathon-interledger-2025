export const formatAmount = (amount: number) => {
  return amount.toLocaleString('mx-MX', {
    style: 'currency',
    currency: 'MXN',
  })
}
