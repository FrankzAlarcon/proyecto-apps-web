export const formatPrice = (price) => {
  const x = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "USD"
  }).format(price)
  return x
}