export const formatCurrencyInCents = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(amount);
};
