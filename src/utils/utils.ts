export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "usd",
    style: "currency",
  }).format(amount);
}
