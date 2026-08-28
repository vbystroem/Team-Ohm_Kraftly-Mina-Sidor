export const formatCurrency = (amount) => {
  return Number(amount) ? amount.toLocaleString("sv-SE") + " kr" : "-";
};
